
+function (a) {
    a.smConfig.rawCitiesData = [{
        name: "河北",
        sub: [{name: "请选择", sub: []}, {
            name: "石家庄",
            sub: [{name: "请选择"}, {name: "新华区"}, {name: "桥东区"}, {name: "桥西区"}, {name: "长安区"}, {name: "裕华区"}, {name: "井陉矿区"}, {name: "鹿泉市"}, {name: "辛集市"}, {name: "藁城市"}, {name: "晋州市"}, {name: "新乐市"}, {name: "深泽县"}, {name: "无极县"}, {name: "赵县"}, {name: "灵寿县"}, {name: "高邑县"}, {name: "元氏县"}, {name: "赞皇县"}, {name: "平山县"}, {name: "井陉县"}, {name: "栾城县"}, {name: "正定县"}, {name: "行唐县"}, {name: "其他"}],
            type: 0
        }, {name: "其他"}],
        type: 1
    }]
}
(Zepto), +function (a) {
    "use strict";
    var b, c = function (a) {
        for (var b = [], c = 0; c < a.length; c++) {
            var d = a[c];
            "请选择" !== d.name && b.push(d.name)
        }
        return b.length ? b : [""]
    }, d = function (a) {
        return a.sub ? c(a.sub) : [""]
    }, e = function (a) {
        for (var b = 0; b < g.length; b++)if (g[b].name === a)return d(g[b]);
        return [""]
    }, f = function (a, b) {
        for (var c = 0; c < g.length; c++)if (g[c].name === a)for (var e = 0; e < g[c].sub.length; e++)if (g[c].sub[e].name === b)return d(g[c].sub[e]);
        return [""]
    }, g = a.smConfig.rawCitiesData, h = g.map(function (a) {
        return a.name
    }), i = d(g[0]), j = [""], k = h[0], l = i[0], m = j[0], n = {
        cssClass: "city-picker",
        rotateEffect: !1,
        onChange: function (a, c, d) {
            var g, h = a.cols[0].value;
            return h !== k ? (clearTimeout(b), void(b = setTimeout(function () {
                var b = e(h);
                g = b[0];
                var c = f(h, g);
                a.cols[1].replaceValues(b), a.cols[2].replaceValues(c), k = h, l = g, a.updateValue()
            }, 200))) : (g = a.cols[1].value, void(g !== l && (a.cols[2].replaceValues(f(h, g)), l = g, a.updateValue())))
        },
        cols: [{textAlign: "center", values: h, cssClass: "col-province"}, {
            textAlign: "center",
            values: i,
            cssClass: "col-city"
        }, {textAlign: "center", values: j, cssClass: "col-district"}]
    };
    a.fn.cityPicker = function (b) {
        return this.each(function () {
            if (this) {
                var c = a.extend(n, b);
                if (c.value) a(this).val(c.value.join(" ")); else {
                    var d = a(this).val();
                    d && (c.value = d.split(" "))
                }
                c.value && (c.value[0] && (k = c.value[0], c.cols[1].values = e(c.value[0])), c.value[1] ? (l = c.value[1], c.cols[2].values = f(c.value[0], c.value[1])) : c.cols[2].values = f(c.value[0], c.cols[1].values[0]), !c.value[2] && (c.value[2] = ""), m = c.value[2]), a(this).picker(c)
            }
        })
    }
}(Zepto);
