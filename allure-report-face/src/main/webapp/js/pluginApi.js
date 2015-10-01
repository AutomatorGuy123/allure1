(function() {
    "use strict";
    var module = angular.module('allure.core.pluginApi', []);
    module.provider('allurePlugins', function($stateProvider, $translatePartialLoaderProvider) {
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.substring(1);
        }
        return {
            tabs: [{name: 'overview', title: 'index.OVERVIEW', icon: 'fa fa-home'}],
            widgets: [{name: 'total', title: 'Total', templateUrl: 'templates/overview/total.html', controller: 'TotalWidgetController'}],
            addTab: function(tabName, options) {
                $stateProvider.state(
                    tabName,
                    angular.extend({
                        url: '/' + tabName,
                        templateUrl: this.getPluginHome(tabName) + "/tab.tpl.html",
                        controller: capitalize(tabName) + 'Ctrl',
                        resolve: {
                            data: function($http) {
                                return $http.get('data/' + tabName + '.json').then(function(response) {
                                    return response.data;
                                });
                            }
                        }
                    }, options)
                );
                this.tabs.push({name: tabName, title: options.title, icon: options.icon});
            },
            addWidget: function(pluginName, config) {
                this.widgets.push(angular.extend({name: pluginName}, config));
            },
            addTranslation: function(pluginName) {
                $translatePartialLoaderProvider.addPart(this.getPluginHome(pluginName));
            },
            addStylesheet: function(pluginName) {
                angular.element(document).find('body').append('<link rel="stylesheet" href="' + this.getPluginHome(pluginName) + '/styles.css" />');
            },
            getPluginHome: function(name) {
                return 'plugins/' + name;
            },
            $get: function() {
                return {
                    tabs: this.tabs,
                    widgets: this.widgets
                };
            }
        };
    });
})();
