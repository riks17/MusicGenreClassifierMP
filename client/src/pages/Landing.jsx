import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Music2,
  Headphones,
  AudioWaveform as Waveform,
  Mic2,
} from "lucide-react";

const Landing = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Music2 className="h-6 w-6 text-purple-500" />,
      title: "Genre Classification",
      description: "Advanced AI-powered music genre detection",
    },
    {
      icon: <Headphones className="h-6 w-6 text-purple-500" />,
      title: "Multiple Genres",
      description: "Support for wide range of music genres",
    },
    {
      icon: <Waveform className="h-6 w-6 text-purple-500" />,
      title: "Audio Analysis",
      description: "Real-time audio processing and analysis",
    },
    {
      icon: <Mic2 className="h-6 w-6 text-purple-500" />,
      title: "High Accuracy",
      description: "Precise genre detection and classification",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Discover Your Music's</span>
              <span className="block text-purple-600">True Genre</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Upload your music and let our AI-powered system identify its
              genre. Fast, accurate, and built for musicians and music
              enthusiasts.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              {!user && (
                <>
                  <div className="rounded-md shadow">
                    <Link
                      to="/signup"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Login
                    </Link>
                  </div>
                </>
              )}
              {user && (
                <div className="rounded-md shadow">
                  <Link
                    to="/dashboard"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0">
            <p className="text-center text-base text-gray-400">
              &copy; 2025 MusicGenre AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
