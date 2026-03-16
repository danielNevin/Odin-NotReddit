import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get the current session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        // Listen for login/logout events
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            }
        )

        // Cleanup listener on unmount
        return () => subscription.unsubscribe()
    }, [])

    return { user, loading }
}