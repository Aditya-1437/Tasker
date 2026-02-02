import { Draggable } from '@hello-pangea/dnd';
import { Task, useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
    task: Task;
    index: number;
}

const priorityColors = {
    low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    high: 'bg-red-500/10 text-red-500 border-red-500/20',
};

export const TaskCard = ({ task, index }: TaskCardProps) => {
    const deleteTask = useStore((state) => state.deleteTask);

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style }}
                    className="mb-3 focus:outline-none"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        className={cn(
                            'group relative p-4 rounded-xl border bg-[#18181b] shadow-sm transition-all overflow-hidden',
                            snapshot.isDragging
                                ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] rotate-2'
                                : 'border-white/5 hover:border-white/10'
                        )}
                    >
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="flex justify-between items-start mb-2">
                            <span
                                className={cn(
                                    'text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border',
                                    priorityColors[task.priority]
                                )}
                            >
                                {task.priority}
                            </span>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>

                        <h3 className="text-sm font-medium text-white mb-1 line-clamp-2">
                            {task.title}
                        </h3>

                        {task.description && (
                            <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                                {task.description}
                            </p>
                        )}

                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                            <GripVertical size={14} className="opacity-20 group-hover:opacity-50" />
                        </div>
                    </motion.div>
                </div>
            )}
        </Draggable>
    );
};
