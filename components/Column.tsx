import { Droppable } from '@hello-pangea/dnd';
import { Task, Status } from '@/store/useStore';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ColumnProps {
    id: Status;
    title: string;
    tasks: Task[];
    color: string;
}

export const Column = ({ id, title, tasks, color }: ColumnProps) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className={cn('w-3 h-3 rounded-full', color)} />
                    <h2 className="text-sm font-semibold text-gray-200 uppercase tracking-widest">
                        {title}
                    </h2>
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-white/5 text-gray-400 rounded-full border border-white/5">
                        {tasks.length}
                    </span>
                </div>
            </div>

            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <motion.div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn(
                            'flex-1 rounded-xl p-2 transition-colors',
                            snapshot.isDraggingOver ? 'bg-white/5 border border-white/5' : 'bg-transparent border border-transparent'
                        )}
                    >
                        <div className="flex flex-col gap-2 min-h-[100px]">
                            {tasks.map((task, index) => (
                                <TaskCard key={task.id} task={task} index={index} />
                            ))}
                        </div>
                        {provided.placeholder}
                    </motion.div>
                )}
            </Droppable>
        </div>
    );
};
