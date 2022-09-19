export default function ModifyPost() {
    return (
        <>
            <form
                method="POST"
                id="creation-form"
                encType="multipart/form-data"
            >
                <div className="creation-form__item">
                    <label htmlFor="title">Titre :</label>
                    <input type="text" name="title" id="title" required />
                </div>

                <div className="creation-form__item">
                    <label htmlFor="content">Votre message :</label>
                    <textarea
                        name="content"
                        id="content"
                        cols="30"
                        rows="10"
                        required
                    />
                </div>

                <div className="creation-form__item">
                    <label htmlFor="image">Ajouter une image</label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                    />
                </div>

                <button type="submit" id="btn-submit">
                    Publier
                </button>
            </form>
        </>
    );
}
