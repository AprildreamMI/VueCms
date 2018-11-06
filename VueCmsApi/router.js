var express = require('express');
var con = require('./models/mysql')
var urlPase = require('url');

var router = express.Router();

router.get('/',function (req,res) {
    res.send("ok!!!");
})

router.get('/api/getListLunBo',function (req,res) {
    var  sql = 'SELECT * FROM lunbotu';
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })
})

router.get('/api/getNewList',function (req,res) {
    var sql = "SELECT id,add_time,click,img_url,title,zhaiyao FROM `newslist`"
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })
})

router.get('/api/getNewsObject',function (req,res) {
    var urlObj = urlPase.parse(req.url,true)
    var sql = "SELECT * FROM newslist WHERE id="+urlObj.query.id
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })

})

router.get('/api/getcomments',function (req,res) {
    var urlObj = urlPase.parse(req.url,true)
    /*判断哪个表名*/
    var tableName = Object.keys(urlObj.query)[0]
    /*拿到id*/
    var comid = urlObj.query[tableName]
    /*拿到页码*/
    var page = urlObj.query.pageindex
    /*定义sql语句*/
    var sql = null;

    //跨过多少条
    var skip = (page-1) * 5;

    switch (tableName) {
        case "news_id":
             sql = `SELECT * FROM news_comment WHERE news_id=${comid} LIMIT ${skip} , 5`
        break;
        case "picture_id":
            sql = `SELECT * FROM picture_comment WHERE picture_id=${comid} LIMIT ${skip} , 5`
        break;
    }

    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })
})

router.post('/api/postcomment',function (req,res) {
    console.log(req.body)
    /*拿到表名*/
    var tableName = req.body.table;
    console.log(tableName)
    var sql = null;

    switch (tableName) {
        case "news_id":
            sql = `INSERT INTO news_comment (news_id,add_time,content) VALUES (${req.body.com_id},'${req.body.add_time}','${req.body.content}')`
        break;
        case "picture_id":
            sql = `INSERT INTO picture_comment (picture_id,add_time,content) VALUES (${req.body.com_id},'${req.body.add_time}','${req.body.content}')`
        break;
    }

    con.query(sql,function (err,result) {
        if (err) {
            console.log(err);
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            console.log(result)
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })
})

router.get('/api/getPhotoCatList',function (req,res) {
    var sql = "SELECT * FROM picturecat"
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })

})

router.get('/api/getPhotoList',function (req,res) {
    var urlObj = urlPase.parse(req.url,true)
    var cat_id = urlObj.query.cat_id
    console.log(cat_id)
    if (cat_id === '0') {
        var sql = "SELECT * FROM picturelist"
    } else {
        var sql = `SELECT * FROM picturelist WHERE cat_id = ${cat_id}`
    }
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            console.log(result)
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })

})

router.get('/api/getPhotoObject',function (req,res) {
    var urlObj = urlPase.parse(req.url,true)
    var sql = "SELECT * FROM picturelist WHERE picture_id="+urlObj.query.id
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })

})

router.get('/api/getPhotoMater',function (req,res) {
    var urlObj = urlPase.parse(req.url,true)
    var sql = "SELECT * FROM picturedata WHERE picture_id="+urlObj.query.id
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })

})

router.get('/api/getGoodsList',function (req,res) {
    var urlObj = urlPase.parse(req.url,true);
    var page = urlObj.query.pageIndex

    //跨过多少条
    var skip = (page-1) * 5;

    var sql = `SELECT * FROM goodslist limit ${skip} , 5`
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })
})

router.get('/api/getGoodsPicture',function (req,res) {
    var urlObj = urlPase.parse(req.url,true)
    var sql = "SELECT * FROM goods_picture WHERE goods_id="+urlObj.query.goods_id
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })

})

router.get('/api/getGoodObject',function (req,res) {
    var urlObj = urlPase.parse(req.url,true)
    var sql = "SELECT * FROM goodslist WHERE goods_id="+urlObj.query.goods_id
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })

})

router.get('/api/getGoodsCart',function (req,res) {
    var urlObj = urlPase.parse(req.url,true)
    var sql = `SELECT * FROM goodslist WHERE goods_id in (${urlObj.query.goods_ids})`
    con.query(sql,function (err,result) {
        if (err) {
            return res.status(200).json({
                result:null,
                status:1,
                message:"server data err"
            });
        } else {
            res.status(200).json({
                result:result,
                status:0,
                message:"data ok"
            });
        }
    })

})

module.exports = router