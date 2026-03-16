import { supabase } from "../lib/supabaseClient";

export async function signUp(email, password, displayName) {
    // 1. Create the auth user
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) throw error

    // 2. Insert into profiles table using the new user's ID
    const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        display_name: displayName,
    })

    if (profileError) throw profileError

    return data.user
}

export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) throw error

    return data.user
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) throw error
}