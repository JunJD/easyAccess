const ResumeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center justify-center w-full max-w-4xl px-4">
                {children}
            </div>
        </main>
    );
}

export default ResumeLayout