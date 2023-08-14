<template>
  <div>
    <NavbarComponent />
    <div class="container mt-5">
      <h2 class="text-center mb-4">Export Manager</h2>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Export Name</th>
                <th>From Page</th>
                <th>Export Start</th>
                <th>Export End</th>
                <th>Current Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(exportItem, index) in exportItems" :key="exportItem.id">
                <td>{{ index + 1 }}</td>
                <td>{{ exportItem.name }}</td>
                <td>{{ exportItem.from_page }}</td>
                <td>{{ exportItem.export_start }}</td>
                <td>{{ exportItem.export_end }}</td>
                <td :class="exportItem.status === 'running' ? 'text-danger' : 'text-success'">{{ exportItem.status }}</td>

                <td>
                  <button class="btn btn-primary" @click="downloadExport(exportItem)" v-if="exportItem.url_file">Download</button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    </div>
  </template>
  
  <script>
import { ref, onMounted } from 'vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import api from '@/api/api.js';

export default {
  components: {
    NavbarComponent,
  },
  setup() {
    const exportItems = ref([]);
    const selectedExport = ref(null);

    const fetchExportItems = async () => {
      try {
        const response = await api.get('/export-manager');
        exportItems.value = response.data.data;
      } catch (error) {
        console.error('Error fetching export items:', error);
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    const showExportDetails = (exportItem) => {
      selectedExport.value = { ...exportItem }; // Clone the exportItem object to prevent direct modification
    };

    const downloadExport = (exportItem) => {
      try {
        const downloadUrl = exportItem.url_file;
        const newTab = window.open(downloadUrl, '_blank');

        if (!newTab) {
          console.error('Failed to open new tab for download.');
        }
      } catch (error) {
        console.error('Error while opening new tab for download:', error);
      }
    };

    const closeExportDetails = () => {
      selectedExport.value = null;
    };

    onMounted(() => {
      fetchExportItems();
    });

    return {
      exportItems,
      selectedExport,
      downloadExport,
      formatDate,
      showExportDetails,
      closeExportDetails,
    };
  },
};
</script>
  
  <style scoped>
  .product-image {
    max-width: 60px;
    max-height: 60px;
    margin-right: 10px;
  }
  </style>