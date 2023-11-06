const useFormData = (entries) => {
    const fd = new FormData();
    for (const k of Object.keys(entries)) {
        if (entries[k]) fd.append(k, entries[k]);
    }
    return fd;
};

export default useFormData;