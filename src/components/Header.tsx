import { useState } from 'react';
import { Settings, Bell, Leaf, LogOut } from 'lucide-react';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

export function Header({ username, onLogout }: HeaderProps) {
  const [showAlerts, setShowAlerts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Leaf className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Vivasaayi</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="p-2 text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setShowAlerts(!showAlerts);
                  setShowSettings(false);
                  setShowProfile(false);
                }}
              >
                <Bell className="h-6 w-6" />
              </button>
              {showAlerts && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    No new notifications
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button 
                className="p-2 text-gray-400 hover:text-gray-500"
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowAlerts(false);
                  setShowProfile(false);
                }}
              >
                <Settings className="h-6 w-6" />
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    <div className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                      Account Settings
                    </div>
                    <div className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                      Preferences
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowAlerts(false);
                  setShowSettings(false);
                }}
                className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <span className="text-sm font-medium text-gray-600">
                  {username.slice(0, 2).toUpperCase()}
                </span>
              </button>
              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                    {username}
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}