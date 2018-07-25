let express=require('express');
const request =require('request');
const bodyParser=require('body-parser');
let app=express();//an instance of express is got,to get from express use app.get
const PORT=process.env.PORT;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.get('/',function(req,res){
  res.render('index',{weather:null,error:null});
}); //rootadress
//to make server(port 3000) in express
app.post('/',function(req,res){
  let city=req.body.city;
  let apiKey='949a6b162493003fdae32de83cc33b4b';

  let url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  request(url,function(err,response,body){
    if(err)
    {
      res.render('index',{weather:null,error:'error! please try again'});
    }
    else {
          let weather=JSON.parse(body);
          if(weather.main==undefined){
            res.render('index',{weather:null,error:'given is not a city'})
          }
          else{
            let weatherText=`It's ${weather.main.temp} degrees in ${weather.name} !`;
            res.render('index',{weather:weatherText,error:null});
          }
    }
  });


})

app.listen(PORT,function(err){
  if(err)
  {  console.log(err); }
  else{
console.log("wrking on 4000");
  }
});
