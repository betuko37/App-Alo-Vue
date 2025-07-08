import { defineStore } from 'pinia'
import type { Task } from '@/interfaces/task'
import { v4 as uuidv4 } from 'uuid'
import { saveTasksToStorage, loadTasksFromStorage } from '@/utils/storage'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
  }),

  actions: {
    // Inicializar tareas desde localStorage
    initializeTasks() {
      this.tasks = loadTasksFromStorage()
    },

    // Guardar tareas en localStorage
    saveTasks() {
      saveTasksToStorage(this.tasks)
    },

    addTask(task: Task) {
      this.tasks.push({ ...task, id: uuidv4(), createdAt: new Date() })
      this.saveTasks()
    },

    getTasks() {
      return this.tasks
    },

    getTaskById(id: string) {
      return this.tasks.find((task) => task.id === id)
    },

    deleteTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
      this.saveTasks()
    },

    updateTask(id: string, updatedTask: Partial<Task>) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id)
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedTask }
        this.saveTasks()
      }
    },

    toggleTask(id: string) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id)
      if (taskIndex !== -1) {
        this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed
        this.saveTasks()
      }
    },
  },
})
