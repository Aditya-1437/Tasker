'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useStore, Priority, Status } from '@/store/useStore';
import { cn } from '@/lib/utils';

export function NewTaskDialog() {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [priority, setPriority] = React.useState<Priority>('medium');
    const [status, setStatus] = React.useState<Status>('todo');

    const addTask = useStore((state) => state.addTask);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        addTask({
            title,
            description,
            priority,
            status,
        });

        setOpen(false);
        setTitle('');
        setDescription('');
        setPriority('medium');
        setStatus('todo');
    };

    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
                <Button size="lg" className="shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    + Add New Task
                </Button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" />
                <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-white/10 bg-[#121212] p-6 shadow-2xl duration-200 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 sm:rounded-2xl">
                    <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                        <DialogPrimitive.Title className="text-lg font-semibold leading-none tracking-tight text-white">
                            Create New Task
                        </DialogPrimitive.Title>
                        <DialogPrimitive.Description className="text-sm text-gray-400">
                            Add a new task to your board. Click save when you're done.
                        </DialogPrimitive.Description>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="title" className="text-sm font-medium text-gray-200">
                                Title
                            </label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Redesign Homepage"
                                className="bg-white/5 border-white/10"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-gray-200">Priority</label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value as Priority)}
                                    className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                                >
                                    <option value="low" className="bg-[#18181b]">Low</option>
                                    <option value="medium" className="bg-[#18181b]">Medium</option>
                                    <option value="high" className="bg-[#18181b]">High</option>
                                </select>
                            </div>

                            <div className="grid gap-2">
                                <label className="text-sm font-medium text-gray-200">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as Status)}
                                    className="flex h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none"
                                >
                                    <option value="todo" className="bg-[#18181b]">Todo</option>
                                    <option value="inprogress" className="bg-[#18181b]">In Progress</option>
                                    <option value="done" className="bg-[#18181b]">Done</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="description" className="text-sm font-medium text-gray-200">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add more details..."
                                className="flex min-h-[80px] w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:opacity-50 resize-none glass"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Create Task
                            </Button>
                        </div>
                    </form>

                    <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4 text-gray-400" />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
