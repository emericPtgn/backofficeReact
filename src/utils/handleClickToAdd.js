export default async function handleClicktoAdd( dispatch, document, updateFunction, toast ) {
    const show = (severity, summary, detail) => {
        if (toast.current) {
            toast.current.show({ severity, summary, detail});
        }
    };
    try {
        console.log(document);
        const response = await updateFunction( document, dispatch );
        console.log(response)
        if (response.status === 'success') {
            show('info', 'Success', 'document added ✅');
        } else {
            show('warn', 'Warning', 'Error adding document 🛑');
        }
        return response; // Retourner la réponse pour un traitement supplémentaire si nécessaire
    } catch (error) {
        show('error', 'Error', 'Error adding document 🛑');
        throw error; // Propager l'erreur si nécessaire
    }
}
