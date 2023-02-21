<template>
    <div v-if="isloading" class="loading-image">
       <img src="../../assets/loading.gif"/>
    </div>
    <div class="container" v-else>
      <auth-wrapper>
        <div class="upper">
          <div class="text-slogen">Sign up to simplify your links</div>
          <div class="full-name">
            <input
              type="text"
              placeholder="Full Name"
              class="register-input-field"
              v-model="formdata.full_name.value"
              @input="validateFullName"
              @keyup.enter="registerClick"
            />
            <p class="error-text" v-if="formdata.full_name.showError">
              {{ formdata.full_name.errorMessage }}
            </p>
          </div>
  
          <div class="phone-number">
            <input
              type="text"
              placeholder="Phone number"
              class="register-input-field"
              v-model="formdata.phone_number.value"
              @input="validatePhoneNumber"
              @keyup.enter="registerClick"
            />
            <p class="error-text" v-if="formdata.phone_number.showError">
              {{ formdata.phone_number.errorMessage }}
            </p>
          </div>
  
          <div class="email-address">
            <input
              type="text"
              placeholder="Email address"
              class="register-input-field"
              v-model="formdata.email_address.value"
              @input="validateEmailAddress"
              @keyup.enter="registerClick"
            />
            <p class="error-text" v-if="formdata.email_address.showError">
              {{ formdata.email_address.errorMessage }}
            </p>
          </div>
  
          <div class="password">
            <input
              type="password"
              placeholder="Password"
              class="register-input-field"
              v-model="formdata.password.value"
              @input="validatePassword"
              @keyup.enter="registerClick"
            />
            <p class="error-text" v-if="formdata.password.showError">
              {{ formdata.password.errorMessage }}
            </p>
          </div>
  
          <div class="confirm-password">
            <input
              type="password"
              placeholder="Confirm Password"
              class="register-input-field"
              v-model="formdata.confirm_password.value"
              @input="validateConfirmPassword"
              @keyup.enter="registerClick"
            />
            <p class="error-text" v-if="formdata.confirm_password.showError">
              {{ formdata.confirm_password.errorMessage }}
            </p>
          </div>
          <p class="error-text" v-if="showError">
            {{ errorMessage }}
          </p>
  
          <div class="policy">
            By signing up, you agree to our Terms, Privacy Policy and Cookies
            Policy.
          </div>
  
          <div class="register-button" v-on:click="registerClick">Sign up</div>
        </div>
      </auth-wrapper>
  
    </div>
  </template>
  
  <script>
  import authWrapper from "../../components/auth-wrapper.vue";
  import apiService from "../../services/api.services";
  export default {
    name: "register",
    components: {
      "auth-wrapper": authWrapper,
    },
    methods: {
      login() {
        this.$router.push("/auth/login");
      },
  
      validateFullName() {
        //regex to validate full name
        let re = /^[a-zA-Z0-9-_'. ]+$/;
        if (!re.test(this.formdata.full_name.value.trim())) {
          this.formdata.full_name.showError = true;
          this.formdata.full_name.errorMessage = "Enter Valid Full name";
          return false;
        } else {
          this.formdata.full_name.showError = false;
          this.formdata.full_name.errorMessage = "";
          return true;
        }
      },
      validatePhoneNumber() {
        //regex to validate phone number
        let re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (!re.test(this.formdata.phone_number.value)) {
          this.formdata.phone_number.showError = true;
          this.formdata.phone_number.errorMessage = "Enter Valid Phone Number";
          return false;
        } else {
          this.formdata.phone_number.showError = false;
          this.formdata.phone_number.errorMessage = "";
          return true;
        }
      },
      validateEmailAddress() {
        //regex to validate email address
        let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!re.test(this.formdata.email_address.value)) {
          this.formdata.email_address.showError = true;
          this.formdata.email_address.errorMessage = "Enter valid Email Address";
          return false;
        } else {
          this.formdata.email_address.showError = false;
          this.formdata.email_address.errorMessage = "";
          return true;
        }
      },
      validatePassword() {
      //regex passowrd check also check if password confirm password matches if confirm password present
        let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (this.formdata.confirm_password.value) {
          if (
            !(
              this.formdata.confirm_password.value == this.formdata.password.value
            )
          ) {
            this.formdata.confirm_password.showError = true;
            this.formdata.confirm_password.errorMessage =
              "Password does not match";
          }
          else{
            this.formdata.confirm_password.showError = false;
            this.formdata.confirm_password.errorMessage ="";
            
          }
        }
        if (!re.test(this.formdata.password.value)) {
          this.formdata.password.showError = true;
          this.formdata.password.errorMessage =
            "Password must be at least 8 characters and contain at least 1 letter, 1 number and 1 special character.";
          return false;
        } else {
          this.formdata.password.showError = false;
          this.formdata.password.errorMessage = "";
          return true;
        }
      },
      validateConfirmPassword() {
        //check if password confirm password matches
        if (
          !(this.formdata.confirm_password.value == this.formdata.password.value)
        ) {
          this.formdata.confirm_password.showError = true;
          this.formdata.confirm_password.errorMessage = "Password does not match";
          return false;
        } else {
          this.formdata.confirm_password.showError = false;
          this.formdata.confirm_password.errorMessage = "";
          return true;
        }
      },
  
      registerClick() {
        this.isloading=true;
        let validform = true,
          isValid;
        //validate all the form data validate methods
        for (let key in this.formdata) {
          isValid = this.formdata[key].validate();
          validform = validform && isValid;
        }
  
        const data = {
          fullName: this.formdata.full_name.value,
          phoneNumber: this.formdata.phone_number.value,
          countryCode: 91,
          emailAddress: this.formdata.email_address.value,
          password: this.formdata.password.value,
        };
        //if all validated then call the register to register user
        if (validform) {
          apiService
            .register(data)
            .then(() => {
              this.isloading=false
              this.$router.push("/main");
            })
            .catch((error) => {
              this.isloading=false
              this.showError = true;
              this.errorMessage = error.response.data.message;
            });
        }
        this.isloading=false;
      },
    },
  
    data() {
      return {
        formdata: {
          full_name: {
            value: "",
            showError: false,
            errorMessage: "",
            validate: this.validateFullName,
          },
  
          phone_number: {
            value: "",
            showError: false,
            errorMessage: "",
            validate: this.validatePhoneNumber,
          },
  
          email_address: {
            value: "",
            showError: false,
            errorMessage: "",
            validate: this.validateEmailAddress,
          },
  
          password: {
            value: "",
            showError: false,
            errorMessage: "",
            validate: this.validatePassword,
          },
  
          confirm_password: {
            value: "",
            showError: false,
            errorMessage: "",
            validate: this.validateConfirmPassword,
          },
        },
        showError: false,
        errorMessage: "",
        isloading:false
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .container {
    width: 350px;
    border: 2px black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .upper-part {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  
  .upper {
    margin-left: 30px;
    margin-right: 30px;
  }
  
  .lower-part {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    height: 100px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  
  .register-input-field {
    width: 100%;
    margin-top: 5px;
    padding: 9px 0 7px 8px;
    background: rgb(250, 250, 250);
    border: 1px solid lightgrey;
    outline: none;
  }
  
  .text-slogen {
    font-size: 16px;
    margin-bottom: 10px;
  }
  
  .register-button {
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    height: 30px;
    margin-top: 15px;
    background-color: rgb(63, 165, 63);
    cursor: pointer;
  }
  
  .partition-or {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    font-size: 12px;
    margin-bottom: 10px;
  }
  
  .policy {
    margin-left: 10px;
    margin-top: 10px;
    font-size: 12px;
  }
  
  .log-in {
    padding-left: 5px;
    color: rgb(57, 98, 221);
    cursor: pointer;
  }
  
  .error-text {
    color: red;
    font-size: 11px;
    margin-top: 3px;
    margin-bottom: 2px;
    text-align: left;
  }
  
  .loading-image{
    height:100px;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  
    img{
      height:100%;
  
    }
  }
  </style>
  