const userInfo = {
    id: 1,
    name: 'Đức Lân',
    age: 18,
    company: 'PTIT'
}

const fakeApi = () => {
    return new Promise((res, rej)=>{
        setTimeout(()=> {
            rej({
                message: 'User not found',
                status: 404
            })
        }, 2000)
    })
}

export default fakeApi