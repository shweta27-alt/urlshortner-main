<template>
    <div v-if="isloading" class="loading-image">
      <img src="../../assets/loading.gif" />
    </div>
    <div class="container" v-else>
      <auth-wrapper>
        <div class="main-content">
          <div class="username">
            <input
              type="text"
              placeholder="Phone number or email address"
              class="reset-password-input-field"
              v-model="username"
              @keyup.enter="resetPassword"
            />
          </div>
          <div class="password">
            <input
              type="password"
              placeholder="New Password"
              class="reset-password-input-field"
              v-model="password"
              @input="validatePassword"
              @keyup.enter="resetPassword"
            />
            <p class="error-text" v-if="showPasswordError">
              {{ showPasswordErrorMessage }}
            </p>
          </div>
          <div class="consfirm-password">
            <input
              type="password"
              placeholder="Confirm New Password"
              class="reset-password-input-field"
              v-model="confirmPassword"
              @input="validateConfirmPassword"
              @keyup.enter="resetPassword"
            />
            <p class="error-text" v-if="showConfirmPasswordError">
              {{ showConfirmPasswordErrorMessage }}
            </p>
          </div>
          <p class="error-text" v-if="showError">
            {{ errorMessage }}
          </p>
          <div class="login-button-div">
            <button
              class="login-button"
              v-on:click="resetPassword"
              :disabled="
                !(
                  username &&
                  password &&
                  !showPasswordError &&
                  confirmPassword &&
                  !showConfirmPasswordError
                )
              "
            >
              <strong>Reset Password</strong>
            </button>
          </div>
        </div>
      </auth-wrapper>
  
      <div class="lower-part">
        Back to login?
        <div v-on:click="goToLogin" class="login">Login</div>
      </div>
    </div>
  </template>
  
  <script>
  import apiService from "@/services/api.services";
  import authWrapper from "../../components/auth-wrapper.vue";
  export default {
    name: "login.vue",
    components: {
      "auth-wrapper": authWrapper,
    },
    methods: {
      goToLogin() {
        this.$router.push("/auth/login");
      },
      resetPassword() {
        //reset the password
        if(this.username && this.password && this.confirmPassword){
          let data = {username: this.username, password: this.password}
        apiService.resetpassword(data).then(()=>{
            this.showError=false
            this.goToLogin()
        }).catch((error)=>{
          console.log(error)
          this.showError=true
          this.errorMessage =  error && error.response && error.response.data &&  error.response.data.message
        })
        }
      
      },
      validatePassword() {
         //regex passowrd check also check if password confirm password matches if confirm password present
        let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (this.confirmPassword) {
          if (!(this.confirmPassword == this.password)) {
            this.showConfirmPasswordError = true;
            this.showConfirmPasswordErrorMessage = "Password does not match";
          } else {
            this.showConfirmPasswordError = false;
            this.showConfirmPasswordErrorMessage = "";
          }
        }
        if (!re.test(this.password)) {
          this.showPasswordError = true;
          this.showPasswordErrorMessage =
            "Password must be at least 8 characters and contain at least 1 letter, 1 number and 1 special character.";
          return false;
        } else {
          this.showPasswordError = false;
          this.showPasswordErrorMessage = "";
          return true;
        }
      },
      validateConfirmPassword() {
        //check if password confirm password matches
        if (!(this.confirmPassword == this.password)) {
          this.showConfirmPasswordError = true;
          this.showConfirmPasswordErrorMessage = "Password does not match";
          return false;
        } else {
          this.showConfirmPasswordError = false;
          this.showConfirmPasswordErrorMessage = "";
          return true;
        }
      },
    },
    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
        showError: false,
        errorMessage: "",
        isloading: false,
        showPasswordError: false,
        showPasswordErrorMessage: "",
        showConfirmPasswordError: false,
        showConfirmPasswordErrorMessage: "",
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .container {
    width: 350px;
    background-color: rgb(255, 254, 254);
    border: 2px black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .lower-part {
    height: 100px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  
  .logo,
  .main-content {
    margin-left: 35px;
    margin-right: 35px;
  }
  
  .login-button {
    width: 100%;
    height: 36px;
  }
  
  .reset-password-input-field {
    width: 100%;
    margin-top: 5px;
    padding: 9px 0 7px 8px;
    background: rgb(250, 250, 250);
    border: 1px solid lightgrey;
    outline: none;
  }
  
  .save-password {
    margin-top: 15px;
  }
  
  .partition,
  .forgot-password {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    font-size: 12px;
    cursor: pointer;
  }
  
  .forgot-password {
    margin-top: 15px;
  }
  
  .login {
    padding-left: 5px;
    cursor: pointer;
    color: rgb(57, 98, 221);
  }
  
  .login-google-text {
    margin-left: 6px;
  }
  
  .error-text {
    color: red;
    font-size: 11px;
    margin-top: 3px;
    margin-bottom: 2px;
    display: flex;
    justify-content: left;
    text-align:left
  }
  
  .login-button {
    background-color: rgb(61, 124, 251);
    border-radius: 5px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-top: 15px;
    font-size: 14px;
    cursor: pointer;
  }
  
  button[disabled] {
    background-color: rgb(105, 104, 104);
    cursor: default;
  }
  
  .loading-image {
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  
    img {
      height: 100%;
    }
  }
  </style>
  