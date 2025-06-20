<template>
  <div class="booking-bg">
    <el-card class="booking-list-card glass-card">
      <h2>My Bookings</h2>
      <div class="booking-filters">
        <el-tag :type="filter === 'upcoming' ? 'primary' : 'info'" @click="filter = 'upcoming'">Upcoming</el-tag>
        <el-tag :type="filter === 'past' ? 'primary' : 'info'" @click="filter = 'past'">Past</el-tag>
        <el-button @click="fetchBookings" size="small">Refresh</el-button>
      </div>
      <el-table :data="bookings" style="width: 100%; margin-top: 16px;">
        <el-table-column prop="meeting_name" label="Name" />
        <el-table-column prop="meeting_room_id" label="Room" />
        <el-table-column prop="start_time" label="Start">
          <template #default="scope">
            {{ new Date(scope.row.start_time).toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column prop="duration" label="Duration" >
          <template #default="scope">{{ scope.row.duration }} mins</template>
        </el-table-column>
        <el-table-column prop="members" label="Members" />
        <el-table-column label="Actions" width="170">
          <template #default="scope">
            <div class="action-btns">
              <router-link :to="`/bookings/${scope.row.id}/edit`" class="action-link">
                <el-button size="small" type="primary" class="pill-btn">Edit</el-button>
              </router-link>
              <el-button size="small" type="danger" class="pill-btn" @click="openCancelDialog(scope.row.id)">Cancel</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 16px;"
        background
        layout="prev, pager, next"
        :current-page="page"
        :page-size="10"
        :total="hasMore ? (page * 10 + 1) : (page * 10)"
        @current-change="val => page = val"
        :hide-on-single-page="true"
      />
      <el-alert v-if="error" :title="error" type="error" show-icon style="margin-top: 16px;" />

      <el-dialog v-model="showCancelDialog" title="Cancel Booking" width="350px" :close-on-click-modal="false">
        <div>Are you sure you want to cancel this booking?</div>
        <template #footer>
          <el-button @click="showCancelDialog = false">No</el-button>
          <el-button type="danger" @click="confirmCancelBooking">Yes, Cancel</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import api from '../../api/api';

const bookings = ref<any[]>([]);
const error = ref('');
const filter = ref<'upcoming' | 'past'>('upcoming');
const page = ref(1);
const hasMore = ref(false);

const showCancelDialog = ref(false);
const cancelId = ref<number|null>(null);

const openCancelDialog = (id: number) => {
  cancelId.value = id;
  showCancelDialog.value = true;
};

const confirmCancelBooking = async () => {
  if (!cancelId.value) return;
  try {
    await api.delete(`/bookings/${cancelId.value}`);
    fetchBookings();
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to cancel booking';
  } finally {
    showCancelDialog.value = false;
    cancelId.value = null;
  }
};

const fetchBookings = async () => {
  error.value = '';
  try {
    const res = await api.get('/bookings', {
      params: { type: filter.value, page: page.value }
    });
    bookings.value = res.data.data;
    hasMore.value = res.data.current_page < res.data.last_page;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to fetch bookings';
  }
};

watch([filter, page], fetchBookings);
onMounted(fetchBookings);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
.booking-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}
.glass-card {
  background: rgba(255,255,255,0.75) !important;
  box-shadow: 0 8px 32px 0 rgba(30,136,229,0.18);
  backdrop-filter: blur(8px);
  border-radius: 18px;
  border: 1.5px solid rgba(30,136,229,0.10);
}
.booking-list-card {
  max-width: 900px;
  margin: 32px auto;
  padding: 24px;
  box-shadow: none;
  border-radius: 18px;
}
.booking-filters {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
}
.action-btns {
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 150px;
  white-space: nowrap;
}
/* Deep selector to override Element Plus button styles */
:deep(.pill-btn) {
  border-radius: 999px !important;
  padding: 0 20px !important;
  font-weight: 600;
  font-size: 0.98rem;
  min-width: 72px;
  box-shadow: 0 2px 8px rgba(30,136,229,0.08);
  height: 32px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.action-link) {
  display: flex;
}
</style>