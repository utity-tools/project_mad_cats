function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans text-center">
      <h1 className="text-6xl font-black tracking-tighter text-orange-500 mb-4">
        MAD CATS 🐈‍⬛
      </h1>
      <p className="text-xl text-gray-400 max-w-md">
        Entorno preparado. Esperando instrucciones para Claude Code...
      </p>
      <div className="mt-8 p-4 border border-orange-500/30 rounded-lg bg-orange-500/5">
        <code className="text-orange-300">Ready to build.</code>
      </div>
    </div>
  )
}

export default App