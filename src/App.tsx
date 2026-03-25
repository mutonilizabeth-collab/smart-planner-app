import React, { useEffect, useState } from 'react';

// TypeScript interfaces for Task and Habit types
interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface Habit {
    id: string;
    title: string;
    frequency: number;
    currentStreak: number;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        const storedHabits = localStorage.getItem('habits');

        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
        if (storedHabits) {
            setHabits(JSON.parse(storedHabits));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [tasks, habits]);

    const addTask = (title: string) => {
        const newTask = { id: Date.now().toString(), title, completed: false };
        setTasks([...tasks, newTask]);
    };

    const toggleTaskCompletion = (id: string) => {
        setTasks(
            tasks.map(task => (
                task.id === id ? { ...task, completed: !task.completed } : task
            ))
        );
    };

    const addHabit = (title: string, frequency: number) => {
        const newHabit = { id: Date.now().toString(), title, frequency, currentStreak: 0 };
        setHabits([...habits, newHabit]);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Smart Planner</h1>
            <h2 className="text-xl font-semibold">Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? 'line-through' : ''}>
                        {task.title} <button onClick={() => toggleTaskCompletion(task.id)}>Toggle</button>
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold">Habits</h2>
            <ul>
                {habits.map(habit => (
                    <li key={habit.id}>{habit.title}</li>
                ))}
            </ul>
            {/* Add forms for adding tasks and habits here */}
        </div>
    );
};

export default App;