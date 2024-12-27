import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
 const app = express();
 app.use(express.json());
 app.use (cors());

 const STUDENTS = [
   {rollNo : 1, Name : "Aditya", city : "Nagpur"},
   {rollNo : 2, Name : "Gitesh", city : "Wani"},
   {rollNo : 3, Name : "Sahil", city : "Hinganghat"},
   {rollNo : 4, Name : "Pankaj", city : "Pune"}
 ]

 app.get("/health",(req ,res)=>{
   res.status(200).json({
      success:true,
      message:"servevr is running"
   });
 })

 app.get("/students",(req,res)=>{
   res.json({
      success:true,
      data:STUDENTS,
      message:"student data"
   })
 })

 app.post("/students",(req,res)=>{
   const {rollNo,Name,city} = req.body
 
 
 if(!rollNo){
  return res.json({
   success:true,
    message:"rollNo is required"
   })
 }
 
  if(!city){
   return res.json({
    success:true,
     message:"city is required"
    })
 
  }
  if(!Name){
   return res.json({
    success:true,
     message:"Name is required"
    })
  }
 
  const studentrollNo = STUDENTS.find((stud)=>{
   if(stud.rollNo == rollNo){
     return stud;
     }
  })
  if(studentrollNo){
   return res.json({
     success:false,
     message:"student is already exits"  
   })
  }
 
  const student={
   rollNo,
   Name,
   city
 }
 STUDENTS.push(student)
 
   res.json({
     suscess:true,
     data:student,
     message:"student is added"
   })
  })

 app.delete("/students/:rollNo",(req,res)=>{
   const {rollNo} = req.params;
   let studetIndex = -1;
 
   STUDENTS.map((stud,index)=>{
     if(stud.rollNo == rollNo){
       studetIndex = index;
     }
   })
 
   if(studetIndex==-1){
     return res.json({
       success:false,
       message:"user are not found"
     });
   }
 
   STUDENTS.splice(studetIndex,1);
   res.json({
   success:true,
   message:"deleted succesfully"
   })
  })

 app.put("/students/:rollNo",(req,res)=>{
   const {rollNo} = req.params;
   const {Name,city} = req.body;
    let studentIndex = -1;
     
 
   STUDENTS.map((stud,index)=>{
    if(stud.rollNo == rollNo){
     studentIndex = index;
     }
   });
   if(studentIndex == -1){
     return res.json({
       success:false,
       message:"student not found"
     });
   }
   const student = {
    rollNo, 
    Name,
    city  
   }
 
    STUDENTS[studentIndex] = student;
 
    res.json({
     suscess:true,
     data:student,
     message:"added successfully"
    });
  })

 app.patch("/students/city/:rollNo",(req,res)=>{
   const {rollNo} = req.params;
   const {city} = req.body;
   let studentIndex = -1;
 
   STUDENTS.map((stud,index)=>{
     if(stud.rollNo == rollNo){
       studentIndex = index;
     }
   });
 
   if(studentIndex == -1){
     return res.json({
       suscess:false,
       message:"student not found"
     });
   }
   const student =STUDENTS[studentIndex];
   student.city = city
 
   STUDENTS[studentIndex] = student;
 
   res.json({
    suscess:true,
    data:student,
    message:"city update susccessfully"
   });
  })

 app.get("/students/:rollNo",(req,res)=>{
   const {rollNo} = req.params;
    let studentIndex = -1;
     
 
   STUDENTS.map((stud,index)=>{
    if(stud.rollNo == rollNo){
     studentIndex = index;
     }
   });
   if(studentIndex == -1){
     return res.json({
       success:false,
       message:"student not found"
     });
   }
    const student = STUDENTS[studentIndex]
 
    res.json({
     suscess:true,
     data:student,
     message:"added successfully"
    });
  })

 app.get("*",(req,res)=>{
   res.status(404).json({
      success:false,
      message: "data is invalid"
   });
 })
 const PORT = process.env.PORT;

 app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
 });