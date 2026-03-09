const express= require('express');
const cookieParser= require('cookie-parser')
const cors= require("cors")

const app= express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

// We are requiring all the routes here 
const authRouter= require("./routes/auth.routes")
const adminRouter= require("./routes/admin.routes")
const patientRouter= require("./routes/patient.routes")
const consultationRouter= require("./routes/consultation.routes")
const vitalsRouter= require("./routes/vitals.routes")
const prescriptionRouter= require("./routes/prescription.routes")

// Using all the routes here 
app.use("/api/auth",authRouter)
app.use("/api/admin",adminRouter)
app.use("/api/patient",patientRouter)
app.use("/api/consultation",consultationRouter)
app.use("/api/vitals",vitalsRouter)
app.use("/api/prescription",prescriptionRouter)

app.get('/',(req,res)=>{
    res.send("Hello")
})
module.exports=app;
