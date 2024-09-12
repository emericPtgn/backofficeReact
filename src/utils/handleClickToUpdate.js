export default async function handleClickToUpdate(id, dispatch, document, updateFunction, toast) {
    const show = (severity, summary, detail) => {
        if (toast.current) {
            toast.current.show({ severity, summary, detail});
        }
    };
    try {
        console.log(document);
        const response = await updateFunction(id, document, dispatch);
        console.log(response)
        if (response.status === 'success') {
            show('info', 'Success', 'updated ✅');
        } else {
            show('warn', 'Warning', 'Error updating 🛑');
        }
        return response; // Retourner la réponse pour un traitement supplémentaire si nécessaire
    } catch (error) {
        show('error', 'Error', 'Error updating 🛑');
        throw error; // Propager l'erreur si nécessaire
    }
}
