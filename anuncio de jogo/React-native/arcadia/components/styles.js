import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d', padding: 20 },
  header: { fontSize: 28, color: '#a64dff', textAlign: 'center', marginVertical: 20, fontWeight: 'bold' },
  input: { backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: '#333', borderRadius: 8, padding: 15, color: '#fff', marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#a64dff', padding: 15, borderRadius: 8, alignItems: 'center', marginVertical: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  listItem: { backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: '#333', borderRadius: 8, padding: 15, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  listText: { color: '#e0e0e0', fontSize: 16, flex: 1 },
  actions: { flexDirection: 'row', gap: 10 },
  btnEdit: { backgroundColor: '#a64dff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  btnDelete: { backgroundColor: '#ff4d4d', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  btnText: { color: '#fff', fontWeight: '600' },
  filterRow: { flexDirection: 'row', marginBottom: 20, gap: 10 },
  picker: { backgroundColor: '#1a1a1a', borderRadius: 8, color: '#fff' },
  emptyText: { color: '#888', textAlign: 'center', marginTop: 50, fontSize: 16 },
  footer: { textAlign: 'center', color: '#666', fontSize: 12, marginTop: 30, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#333' },
});