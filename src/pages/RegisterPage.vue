<template>
    <div class="login-container">
      <div class="card mt-5 text-light secondary-color min-vw-40">
        <div class="card-header text-center tertiary-color">Register To Have Access</div>
        <div class="card-body">
          <form @submit.prevent="submitForm">
            <FormField label="Email" v-model="formData.email" />
            <FormField label="Name" v-model="formData.name" />
            <FormField label="Username" v-model="formData.username" />
            <FormField label="Password" v-model="formData.password" type="password" />
            <button type="submit" class="btn btn-block mt-4 tertiary-color text-light">Register</button>
            <div class="text-light mt-3 text-center">
              If You Have an Account, <router-link to="/" class="text-light">Login Here</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import api from '@/api/api.js';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  
  import FormField from '@/components/FormField.vue';
  
  export default {
    components: {
      FormField
    },
    setup() {
      const router = useRouter();
      const toast = useToast();
      const formData = ref({
        email: '',
        password: '',
        username: '',
        name: ''
      });
  
      const submitForm = () => {
        api.post('/register', formData.value)
          .then(response => {
            if (response.status === 201) {
              toast.success('Registration Successful', {
                timeout: 2000
              });
              router.push('/');
            }
          })
          .catch(error => {
            toast.error(error.response.data.message, {
              timeout: 2000
            });
            console.error('Error submitting form:', error);
          });
      };
  
      return {
        formData,
        submitForm
      };
    }
  };
  </script>
  
  <style scoped>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .card{
        width:90%
    }
    @media(min-width:760px){
        .card{
            width:40%
        }
    }
  </style>
  