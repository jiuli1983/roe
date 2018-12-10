layui.define(["larry", "face", "upload", "form", "code"], function (e) {
    var n = layui.$, t = layui.larry, o = layui.larryms, s = layui.face, r = layui.device(), p = layui.upload,
        c = layui.form, i = "larryEditor";
    var l = ['<div class="layui-unselect fly-edit larryms-edit">', '<span type="face" title="插入表情"><i class="iconfont icon-yxj-expression" style="top: 1px;"></i></span>', '<span type="picture" title="插入图片：img[src]"><i class="iconfont icon-tupian"></i></span>', '<span type="href" title="超链接格式：a(href)[text]"><i class="iconfont icon-lianjie"></i></span>', '<span type="code" title="插入代码code"><i class="iconfont icon-emwdaima" style="top: 1px;"></i></span>', '<span type="quote" title="引用"><i class="larry-icon larry-yinyong" style="top: 1px;"></i></span>', '<span type="p" title="段落"><i class="larry-icon larry-duanluo" style="top: 1px;"></i></span>', '<span type="li" title="列表li"><i class="larry-icon larry-liebiao" style="top: 1px;"></i></span>', '<span type="table" title="表格"><i class="larry-icon larry-biaoge" style="top: 1px;"></i></span>', '<span type="hr" title="插入水平线">hr</span>', '<span type="yulan" title="预览"><i class="iconfont icon-yulan1"></i></span>', "</div>"].join("");
    var a = function () {
        this.config = {elem: ".larryms-editor", uploadUrl: undefined, previewIsOpen: false}
    };
    if (r.ie && r.ie < 8) {
        layer.alert("如果您非得使用 IE 浏览器访问LarryMS社区，那么请使用 IE8+")
    }
    layui.focusInsert = function (e, t) {
        var i, a = e.value;
        e.focus();
        if (document.selection) {
            i = document.selection.createRange();
            document.selection.empty();
            i.text = t
        } else {
            i = [a.substring(0, e.selectionStart), t, a.substr(e.selectionEnd)];
            e.focus();
            e.value = i.join("")
        }
    };
    a.prototype.set = function (e) {
        var t = this;
        n.extend(true, t.config, e);
        return t
    };
    a.prototype.face = function (t, e) {
        var i = "", a;
        for (var l in s) {
            i += '<li title="' + l + '"><img src="' + s[l] + '"></li>'
        }
        i = '<ul id="LAY-editface" class="layui-clear">' + i + "</ul>";
        o.tips(i, e, {tips: 3, time: 0, skin: "layui-edit-face"});
        n(document).on("click", function () {
            o.closeAll("tips")
        });
        n("#LAY-editface li").on("click", function () {
            var e = n(this).attr("title") + " ";
            layui.focusInsert(t[0], "face" + e)
        })
    };
    a.prototype.picture = function (l) {
        var e = this, t = e.config;
        layer.open({
            type: 1,
            id: "fly-jie-upload",
            title: "插入图片",
            shade: false,
            area: "465px",
            fixed: false,
            offset: [l.offset().top - n(window).scrollTop() + "px", l.offset().left + 30 + "px"],
            skin: "layui-layer-border",
            content: ['<ul class="layui-form layui-form-pane" style="margin: 20px;">', '<li class="layui-form-item">', '<label class="layui-form-label">URL</label>', '<div class="layui-input-inline">', '<input required name="image" placeholder="支持直接粘贴远程图片地址" value="" class="layui-input">', "</div>", '<button type="button" class="layui-btn layui-btn-primary" id="uploadImg"><i class="layui-icon">&#xe67c;</i>上传图片</button>', "</li>", '<li class="layui-form-item" style="text-align: center;">', '<button type="button" lay-submit lay-filter="uploadImages" class="layui-btn">确认</button>', "</li>", "</ul>"].join(""),
            success: function (e, i) {
                var a = e.find('input[name="image"]');
                p.render({
                    elem: "#uploadImg", url: t.uploadUrl, size: 125, done: function (e) {
                        if (e.code == 1) {
                            a.val(e.url)
                        } else {
                            layer.msg(e.msg, {icon: 5})
                        }
                    }
                });
                c.on("submit(uploadImages)", function (e) {
                    var t = e.field;
                    if (!t.image) return a.focus();
                    layui.focusInsert(l[0], "img[" + t.image + "] ");
                    o.close(i)
                })
            }
        })
    };
    a.prototype.href = function (a) {
        o.prompt({
            title: "请输入合法链接",
            shade: false,
            fixed: false,
            id: "LAY_flyedit_href",
            offset: [a.offset().top - n(window).scrollTop() + "px", a.offset().left + "px"]
        }, function (e, t, i) {
            if (!/^http(s*):\/\/[\S]/.test(e)) {
                o.tips("这根本不是个链接，不要骗我。", i, {tips: 1});
                return
            }
            layui.focusInsert(a[0], " a(" + e + ")[" + e + "] ");
            o.close(t)
        })
    };
    a.prototype.code = function (a) {
        o.prompt({
            title: "请贴入代码或任意文本",
            formType: 2,
            maxlength: 1e4,
            shade: false,
            id: "LAY_flyedit_code",
            area: ["800px", "360px"]
        }, function (e, t, i) {
            layui.focusInsert(a[0], "[pre]\n" + e + "\n[/pre]");
            o.close(t)
        })
    };
    a.prototype.quote = function (a) {
        o.prompt({
            title: "请贴入引用任意文本",
            formType: 2,
            maxlength: 1e4,
            shade: false,
            id: "LAY_flyedit_quote",
            area: ["800px", "360px"]
        }, function (e, t, i) {
            layui.focusInsert(a[0], "[quote]\n" + e + "\n[/quote]");
            o.close(t)
        })
    };
    a.prototype.p = function (a) {
        o.prompt({
            title: "请插入段落文本",
            formType: 2,
            maxlength: 1e4,
            shade: false,
            id: "LAY_flyedit_p",
            area: ["800px", "360px"]
        }, function (e, t, i) {
            layui.focusInsert(a[0], "[p]\n" + e + "\n[/p]");
            o.close(t)
        })
    };
    a.prototype.li = function (a) {
        o.prompt({
            title: "请插入列表文本",
            formType: 2,
            maxlength: 1e4,
            shade: false,
            id: "LAY_flyedit_p",
            area: ["800px", "360px"]
        }, function (e, t, i) {
            layui.focusInsert(a[0], "[li]\n" + e + "\n[/li]");
            o.close(t)
        })
    };
    a.prototype.hr = function (e) {
        layui.focusInsert(e[0], "[hr]")
    };
    a.prototype.yulan = function (e) {
        var i = this, a = e.val();
        a = /^\{html\}/.test(a) ? a.replace(/^\{html\}/, "") : o.content(a, s);
        var t = r.ios || r.android;
        if (i.config.previewIsOpen) return o.close(l);
        var l = o.open({
            type: 1,
            title: "LarryMS预览",
            shade: false,
            offset: "r",
            area: ["50%", "100%"],
            scrollbar: false,
            area: [t ? "100%" : "50%", "100%"],
            scrollbar: t ? false : true,
            anim: -1,
            isOutAnim: false,
            content: '<div class="detail-body" style="margin:20px;">' + a + "</div>",
            success: function (t) {
                e.on("keyup", function (e) {
                    t.find(".detail-body").html(a)
                });
                i.config.previewIsOpen = true;
                layui.code({about: false})
            },
            end: function () {
                i.config.previewIsOpen = false
            }
        })
    };
    a.prototype.render = function (e) {
        var t = this;
        t.set(e);
        t.init()
    };
    a.prototype.init = function () {
        var a = this, e = a.config;
        $editor = o.elemCheck(e.elem, "editor");
        if ($editor == "error") {
            return false
        }
        $editor.each(function (e) {
            var i = n(this), t = i.parent();
            t.prepend(l);
            t.find(".larryms-edit span").on("click", function (e) {
                var t = n(this).attr("type");
                a[t].call(a, i, this);
                if (t === "face") {
                    e.stopPropagation()
                }
            })
        })
    };
    var u = new a;
    e(i, u)
});