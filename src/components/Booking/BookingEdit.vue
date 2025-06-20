<template>
  <div class="edit-bg">
    <el-card class="edit-card glass-card">
      <h2>Edit Booking</h2>
      <el-form class="edit-form" @submit.prevent="updateBooking">
        <el-form-item label="Meeting Name" required>
          <el-input v-model="meeting_name" placeholder="Meeting Name" />
        </el-form-item>
        <el-form-item label="Date & Time" required>
          <el-date-picker v-model="start_time" type="datetime" :disabled-date="date => date < new Date()" placeholder="Select date and time" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="Duration" required>
          <el-select v-model="duration" placeholder="Select duration">
            <el-option label="30 mins" :value="30" />
            <el-option label="60 mins" :value="60" />
            <el-option label="90 mins" :value="90" />
          </el-select>
        </el-form-item>
        <el-form-item label="Members" required>
          <el-input-number v-model="members" :min="1" placeholder="Members" />
        </el-form-item>
        <el-form-item label="Available Rooms">
          <el-button type="info" @click="fetchRooms">Check Available Rooms</el-button>
          <el-select v-model="meeting_room_id" placeholder="Select Room" style="margin-left: 16px; width: 220px;">
            <el-option v-for="room in availableRooms" :key="room.id" :label="`${room.name} (${room.capacity})`" :value="room.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Update</el-button>
        </el-form-item>
        <el-alert v-if="error" :title="error" type="error" show-icon style="margin-top: 16px;" />
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../api/api';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const meeting_name = ref('');
const start_time = ref<Date | null>(null);
const duration = ref(30);
const members = ref(1);
const meeting_room_id = ref('');
const availableRooms = ref<any[]>([]);
const error = ref('');

function formatLocalDateTime(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;
}

const fetchBooking = async () => {
  try {
    const res = await api.get('/bookings', { params: { type: 'upcoming' } });
    const booking = res.data.data.find((b: any) => b.id == id);
    if (booking) {
      meeting_name.value = booking.meeting_name;
      start_time.value = new Date(booking.start_time);
      duration.value = booking.duration;
      members.value = booking.members;
      meeting_room_id.value = booking.meeting_room_id;
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to load booking';
  }
};

const fetchRooms = async () => {
  error.value = '';
  try {
    const params = {
      start_time: start_time.value ? formatLocalDateTime(start_time.value) : null,
      duration: duration.value,
      members: members.value,
    };
    const res = await api.get('/meeting-rooms/available', { params });
    availableRooms.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to fetch rooms';
  }
};

const updateBooking = async () => {
  error.value = '';
  try {
    await api.put(`/bookings/${id}`, {
      meeting_name: meeting_name.value,
      start_time: start_time.value ? formatLocalDateTime(start_time.value) : null,
      duration: duration.value,
      members: members.value,
      meeting_room_id: meeting_room_id.value,
    });
    router.push('/bookings');
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Update failed';
  }
};

onMounted(() => {
  fetchBooking();
});
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
.edit-bg {
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
.edit-card {
  width: 420px;
  padding: 32px 24px 24px 24px;
  box-shadow: none;
  border-radius: 18px;
}
.edit-form {
  margin-top: 8px;
  width: 100%;
}
</style>