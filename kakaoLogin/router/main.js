module.exports = function(app, fs)  //fs모듈 추가
{
  app.get('/',function(req,res){
    res.render('index',{  //json데이터 페이지에 전달
      title : "MyHome",
      length : 5
    })
  });
}