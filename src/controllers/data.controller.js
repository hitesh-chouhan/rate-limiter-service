exports.getData = (req,res)=>{
    res.status(200).json({
        message : "Request successful",
        data: "Protected data response"
    })
}