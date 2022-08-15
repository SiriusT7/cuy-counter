const body = document.querySelector("body");
const head = document.querySelector("head");

/* const main = `
    <div class="main">
        <div id="score">
            <h1 id="global"></h1>
            <h1 id="local"></h1>
            <button id="logout">LOGOUT</button>
        </div>
    </div>
` */
const main = `
    <div class="main">
    <div class="leftfloat">
       <div id="list-score">
          <ol>
             <li><span id="name">Upeko</span> <span id="value">111</span></li>
             <li><span id="name">Mikochi</span> <span id="value">0</span></li>
             <li><span id="name">Lunatan</span> <span id="value">0</span></li>
             <li><span id="name">Maririn</span> <span id="value">47</span></li>
             <li><span id="name">Ateshi</span> <span id="value">44.5</span></li>
             <li><span id="name">Kanatan</span> <span id="value">100kg</span></li>
             <li><span id="name">Kanatan</span> <span id="value">100kg</span></li>
          </ol>
          <div id="etc">. . .</div>
       </div>
       <div class="actionlogout">
          <button id="logout">LOGOUT</button>
       </div>
    </div>
    <div id="score">
       <h1 id="local">4332</h1>
       <h1 id="cuy">CUY!</h1>
    </div>
    </div>
`

const login = `
    <div class="login-form">
        <div>
            <h1>Login dulu gan</h1>
            <div class="content">
                <div class="input-field">
                    <input type="text" placeholder="Username" autocomplete="nope" id="username">
                </div>
                <div class="input-field">
                    <input type="password" placeholder="Password" autocomplete="new-password" id="password">
                </div>
                <a href="#" class="link" id="guest">Gak punya akun, gak pengen daftar</a>
            </div>
            <div class="action">
                <button id="signup-button">Gak punya akun</button>
                <button id="login-button">Hayuk lah</button>
            </div>
        </div>
    </div>
`

const signup = `
    <div class="login-form">
        <div>
            <h1>Ngedaftar</h1>
            <div class="content">
                <div class="input-field">
                    <input type="text" placeholder="Username" autocomplete="nope" title="sembarang aja" id="username">
                </div>
                <div class="input-field">
                    <input type="password" placeholder="Password" autocomplete="new-password" title="serah" id="password">
                </div>
                <br>
            </div>
            <div class="action">
                <button id="cancel">Gak jadi</button>
                <button id="signup">DAFTAR!</button>
            </div>
        </div>
    </div>
`

const User = [
    {
        username: "guest",
        value: 0
    },
    {
        username: "Kobo",
        password: "123",
        value: 21
    },
    {
        username: "Kaela",
        password: "123",
        value: 10
    },
    {
        username: "Zeta",
        password: "123",
        value: 42
    }
]

const setMain = (userId) => {
    const userList = JSON.parse(window.localStorage.getItem("user"))
    const thisUser = userList[userId]

    let scoreGlobal = 0;
    userList.map((user) => { scoreGlobal += user.value })

    body.innerHTML = main

    const cuy = document.getElementById("cuy")
    const localScore = document.getElementById("local")
    //const globalScore = document.getElementById("global")
    const logoutButton = document.getElementById("logout")

    localScore.innerHTML = thisUser.value
    //globalScore.innerHTML = scoreGlobal

    cuy.addEventListener("click", () => {
        const recentValue = parseInt(localScore.innerHTML) + 1
        localScore.innerHTML = recentValue
        userList[userId].value += 1
        window.localStorage.setItem("user", JSON.stringify(userList))
    })

    setInterval(() => {
        let scoreGlobal = 0;
        userList.map((user) => { scoreGlobal += user.value })
        //globalScore.innerHTML = scoreGlobal
    }, 2000)

    logoutButton.addEventListener("click", () => {
        window.localStorage.removeItem("recent")
        setLogin()
    })

    const rand = (min, max) => { return Math.floor(Math.random() * (max - min) + min) }
    document.getElementById("cuy").onpointerdown = (e) => {document.getElementById(e.currentTarget.id).style.transform = `scale(1.2) rotate(${rand(-10,10)}deg)` }
    document.getElementById("cuy").onpointerup = (e) => { document.getElementById(e.currentTarget.id).style.transform = "scale(1) rotate(0deg)" }   
}

const setSignup = () => {
    body.innerHTML = signup;

    const signupButton = document.getElementById("signup")
    const cancelButton = document.getElementById("cancel")

    const username = document.getElementById("username")
    const password = document.getElementById("password")

    const isUser = () => {
        const userList = JSON.parse(window.localStorage.getItem("user"))
        userList.push({
            username: username.value,
            password: password.value,
            value: 0
        })
        window.localStorage.setItem("user", JSON.stringify(userList))

        let userFound = false
        let userId = 0;
        let global = 0;

        userList.map((user, id) => { if (username.value == user.username && password.value == user.password) { userFound = true, userId = id } global += user.value })
        window.localStorage.setItem("recent", userId)
        setMain(userId)
    }

    const isAlready = (username) => {
        const userList = JSON.parse(window.localStorage.getItem("user"))
        let userAtHere = false
        userList.map((user) => { if (username == user.username) { userAtHere = true } })
        userAtHere ? alert("username already use") : isUser();
    }

    signupButton.onclick = () => {
        if (username.value !== '' && password.value !== '') { isAlready(username.value) }
        if (username.value === '' && password.value === '') { alert("keduanya kosong") }
        if (username.value === '' && password.value !== '') { alert("user kosong") }
        if (username.value !== '' && password.value === '') { alert("password kosong") }
    }

    cancelButton.onclick = () => {
        setLogin()
    }
}

const setLogin = () => {
    body.innerHTML = login;

    const loginButton = document.getElementById("login-button")
    const signupButton = document.getElementById("signup-button")
    const guest = document.getElementById("guest")

    const username = document.getElementById("username")
    const password = document.getElementById("password")

    const isUser = () => {
        const userList = JSON.parse(window.localStorage.getItem("user"))
        let userFound = false
        let userId = 0;
        let global = 0;
        userList.map((user, id) => { if (username.value == user.username && password.value == user.password) { userFound = true, userId = id } global += user.value })
        userFound ? setMain(userId) : alert("userNotFound")
        window.localStorage.setItem("recent", userId)
    }

    loginButton.onclick = () => {
        if (username.value !== '' && password.value !== '') { isUser() }
        if (username.value === '' && password.value === '') { alert("keduanya kosong") }
        if (username.value === '' && password.value !== '') { alert("user kosong") }
        if (username.value !== '' && password.value === '') { alert("password kosong") }
    }

    signupButton.onclick = () => {
        setSignup();
    }

    guest.onclick = () => {
        let global = 0
        const userList = JSON.parse(window.localStorage.getItem("user"))
        userList.map((user) => { global += user.value })
        setMain(0)
        window.localStorage.setItem("recent", 0)
    }
}

window.onload = () => {
    window.localStorage.getItem("user") === null && window.localStorage.setItem("user", JSON.stringify(User))
    const recentUser = window.localStorage.getItem("recent")
    if (recentUser == null) { setLogin() }
    if (recentUser != null) { setMain(recentUser) }
}