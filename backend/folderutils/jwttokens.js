export const generatetoken=(user,message, statuscode, res)=>{
    const token=user.generateJsonWebToken();
    const cookieName = user.role ==="Admin"? "adminToken" : "patientToken";
    
    res.status(statuscode)
    .cookie(cookieName, token, {
        // expires: new Date(Date.now() + process.env.JWT_EXPIRES),
        httpOnly: true,
    })
    .json({
        success:true, 
        message,
        user,
        token
    });
};