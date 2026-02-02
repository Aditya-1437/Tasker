'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Column } from './Column';
import { useStore, Status } from '@/store/useStore';

export const Board = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { tasks, moveTask } = useStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // For now, we only handle status changes (moving between columns)
        // Reordering within the same column is trickier with a flat store without strict order management
        if (destination.droppableId !== source.droppableId) {
            moveTask(draggableId, destination.droppableId as Status);
        }
    };

    if (!isMounted) return null; // Prevent hydration mismatch

    const columns: { id: Status; title: string; color: string }[] = [
        { id: 'todo', title: 'To Do', color: 'bg-amber-500 box-shadow-amber' },
        { id: 'inprogress', title: 'In Progress', color: 'bg-blue-500 box-shadow-blue' },
        { id: 'done', title: 'Done', color: 'bg-emerald-500 box-shadow-emerald' },
    ];

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {columns.map((col) => (
                    <div key={col.id} className="glass-panel rounded-2xl p-4 h-full min-h-[500px]">
                        <Column
                            id={col.id}
                            title={col.title}
                            color={col.color}
                            tasks={tasks.filter((t) => t.status === col.id)}
                        />
                    </div>
                ))}
            </div>
        </DragDropContext>
    );
};
