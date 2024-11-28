import React from 'react';
import { Compass, Flame, Clock, Star, TrendingUp } from 'lucide-react';

const Sidebar = () => {
    const categories = [
        { icon: <Flame className="w-5 h-5" />, name: 'Popular', path: '/popular' },
        { icon: <Clock className="w-5 h-5" />, name: 'New', path: '/new' },
        { icon: <TrendingUp className="w-5 h-5" />, name: 'Rising', path: '/rising' },
        { icon: <Star className="w-5 h-5" />, name: 'Top', path: '/top' },
    ];

    return (
        <div className="hidden md:block w-64 min-h-screen p-4 bg-white border-r border-gray-200">
            <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Feeds</h3>
                    <nav className="space-y-2">
                        {categories.map((category) => (
                            <a
                                key={category.name}
                                href={category.path}
                                className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                {category.icon}
                                <span className="ml-3">{category.name}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Discover</h3>
                    <div className="space-y-2">
                        <a
                            href="/explore"
                            className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <Compass className="w-5 h-5" />
                            <span className="ml-3">Explore Communities</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;