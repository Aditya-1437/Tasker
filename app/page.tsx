import { Board } from '@/components/Board';
import { NewTaskDialog } from '@/components/NewTaskDialog';
import { Sparkles } from 'lucide-react';

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen p-4 md:p-8 max-w-[1600px] mx-auto">
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 flex items-center gap-3">
                        Tasker <Sparkles className="text-blue-500" size={24} />
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your projects with premium efficiency.</p>
                </div>
                <NewTaskDialog />
            </header>

            <section className="flex-1 overflow-visible">
                <Board />
            </section>

            {/* Background Decor */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-[#0a0a0a]">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[100px]" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-indigo-900/5 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>
        </main>
    );
}
