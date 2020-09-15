export default (function (server,socket){
    const io = socket(server)
    io.on('connection',()=>console.log('connection made'))
})()
// export default io