<template>
  <div class=" mx-2 primary-color d-flex align-items-center min-vh-100">
    <div class="row justify-content-center w-100">
      <div class="col-md-6">
        <div class="card mt-5 text-light secondary-color">
          <div class="card-header text-center tertiary-color">Login To Access</div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <FormField label="Email" v-model="formData.email" />
              <FormField label="Password" v-model="formData.password" type="password"/>
              <button type="submit" class="btn btn-block mt-4 tertiary-color text-light">
                Login
              </button>
              <div class="text-light mt-3 text-center">
                <div class="text-light mt-3 text-center">
                    If You Don't Have an Account, <router-link to="/register" class="text-light">Register Here</router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import api from '@/api/api.js';
import FormField from '@/components/FormField.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

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
    });

    const submitForm = () => {
      api.post('/login', formData.value)
        .then(response => {
          if (response.status === 200) {
            toast.success('Login Success, Redirecting To Dashboard', {
              timeout: 2000
            });
            
            const token = response.data.token.token;
            const user = response.data.token.user;

            // Store token and user info in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            router.push('/dashboard');
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
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
