import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface AddTaskProps {
  onCancel: () => void;
  onSave: () => void;
}

const AddTaskScreen: React.FC<AddTaskProps> = ({ onCancel, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create New Task</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput style={styles.input} placeholder="E.g., Complete assignment" value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.textArea]} placeholder="Add details..." value={description} onChangeText={setDescription} multiline numberOfLines={4} />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityContainer}>
          {['Low', 'Medium', 'High'].map((level) => (
            <TouchableOpacity 
              key={level} 
              style={[styles.priorityBtn, priority === level && styles.priorityBtnActive]}
              onPress={() => setPriority(level)}
            >
              <Text style={[styles.priorityText, priority === level && styles.priorityTextActive]}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Note: Date-time and deadline will require a date-picker library later, so we use text inputs as placeholders for now */}
        <Text style={styles.label}>Date & Time (Placeholder)</Text>
        <TextInput style={styles.input} placeholder="YYYY-MM-DD HH:MM" />

        <Text style={styles.label}>Deadline (Placeholder)</Text>
        <TextInput style={styles.input} placeholder="YYYY-MM-DD HH:MM" />

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveButtonText}>Save Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { padding: 24, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  formContainer: { padding: 24 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#374151', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, padding: 16, fontSize: 16, color: '#111827' },
  textArea: { height: 100, textAlignVertical: 'top' },
  priorityContainer: { flexDirection: 'row', gap: 10 },
  priorityBtn: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#D1D5DB', alignItems: 'center' },
  priorityBtnActive: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  priorityText: { color: '#6B7280', fontWeight: 'bold' },
  priorityTextActive: { color: '#FFFFFF' },
  actionContainer: { flexDirection: 'row', gap: 16, marginTop: 40 },
  cancelButton: { flex: 1, padding: 16, borderRadius: 10, backgroundColor: '#F3F4F6', alignItems: 'center' },
  cancelButtonText: { color: '#4B5563', fontWeight: 'bold', fontSize: 16 },
  saveButton: { flex: 1, padding: 16, borderRadius: 10, backgroundColor: '#4F46E5', alignItems: 'center' },
  saveButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});

export default AddTaskScreen;