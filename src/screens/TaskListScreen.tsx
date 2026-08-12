import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

interface TaskListProps {
  onAddNewTask: () => void;
  onLogout: () => void;
}

// Temporary fake data until we connect the database
const DUMMY_TASKS = [
  { id: '1', title: 'Finish React Native App', priority: 'High', completed: false },
  { id: '2', title: 'Review MongoDB basics', priority: 'Medium', completed: true },
];

const TaskListScreen: React.FC<TaskListProps> = ({ onAddNewTask, onLogout }) => {
  
  // This dictates how a single task card looks
  const renderTask = ({ item }: { item: any }) => (
    <View style={[styles.taskCard, item.completed && styles.taskCardCompleted]}>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>
          {item.title}
        </Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.priorityBadge}>{item.priority} Priority</Text>
          <Text style={styles.statusBadge}>{item.completed ? 'Done' : 'Pending'}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.completeBtn}>
          <Text style={styles.btnText}>✓</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.btnText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DUMMY_TASKS}
        keyExtractor={item => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.fab} onPress={onAddNewTask}>
        <Text style={styles.fabText}>+ Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  logoutText: { color: '#EF4444', fontWeight: 'bold' },
  listContainer: { padding: 20 },
  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  taskCardCompleted: { opacity: 0.6 },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  taskTitleCompleted: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  badgeContainer: { flexDirection: 'row', gap: 8 },
  priorityBadge: { backgroundColor: '#FEE2E2', color: '#B91C1C', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, fontSize: 12, fontWeight: 'bold' },
  statusBadge: { backgroundColor: '#E0E7FF', color: '#4338CA', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, fontSize: 12, fontWeight: 'bold' },
  actionButtons: { flexDirection: 'row', gap: 8, marginLeft: 16 },
  completeBtn: { backgroundColor: '#10B981', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  deleteBtn: { backgroundColor: '#EF4444', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  fab: {
    position: 'absolute', bottom: 30, right: 24,
    backgroundColor: '#4F46E5', paddingHorizontal: 24, paddingVertical: 16, borderRadius: 30,
    shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  fabText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});

export default TaskListScreen;