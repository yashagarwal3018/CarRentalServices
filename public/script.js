

$(document).ready(function(){
 var socket=io();
 socket.on('connect',function(socket){
    console.log('Connected to Server');
 });

 var ObjectID=$('#ObjectID').val();
 var carID=$('#carID').val();
 socket.emit('ObjectID',{
  carID: carID,
  userID: ObjectID
 });

 socket.on('car',function(car){
   console.log(car);
   console.log(car.location);
   $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${car.location}&key=AIzaSyDUfag1Idgwyny6lSKNWne5UsLUj2uS8XA`,
      type: 'POST',
      dataType: 'json',   
      processData: true,
      success: function(data){
        console.log(data);
        
        socket.emit('LatLng',{
          data: data,
          car: car
        });
      }
   })
 });

 

 socket.on('disconnect',function(socket){
    console.log('Disconnected from Server');
 });


});