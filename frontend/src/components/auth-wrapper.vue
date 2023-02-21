<template>
    <div class="auth-wrapper">
      <div class="upper-part">
        <img src="../assets/logo.png" alt="">
        <div class="login-register">
          <div class="login" @click="login">Login</div>
          <div class="signin" @click="newlogin">Sign-up</div>
          
          </div>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods:{
      login() {
        this.$router.push("/auth/login");
      },
      newlogin() {
        this.$router.push("/auth/register");
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  .upper-part {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding:15px;
    border-radius:50px;
  }
  
  .lower-part{
    font-size: 14px;
  }
  .logo {
    height: 100px;
    display: flex;
    justify-content: center;
  }
  
  .chat-logo{
    height:74px;
  }

  .login-register{
    display:flex;
    justify-content: center; 
  }

  .login{
    margin-right:60px;
    margin-bottom:30px;
    cursor: pointer;
  }

  .signin{
    cursor: pointer;
  }

  .auth-wrapper{
    background-color: rgb(255, 255, 255);
  }

  img {
  height: 50px;
}
  </style>
