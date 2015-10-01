package ru.yandex.qatools.allure.data;

import javax.xml.bind.annotation.*;
import java.util.Map;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "widgets", propOrder = {

})
public class Widgets {

    @XmlElement(required = true)
    protected String hash;

    @XmlElementWrapper(name = "plugins", required = true)
    @XmlElement(name = "plugin")
    protected Map<String, Object> plugins;

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public Map<String, Object> getPlugins() {
        return plugins;
    }

    public void setPlugins(Map<String, Object> plugins) {
        this.plugins = plugins;
    }
}
