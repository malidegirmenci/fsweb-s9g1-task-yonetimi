import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const PeopleForm = ({ kisiler, submitFn }) => {
  const {
    register, 
    handleSubmit, 
    reset, 
    formState:{
      errors, isValid
    }
  } = useForm({mode:"onChange"});
  const onFormSubmit = (data) => {
    submitFn(data.title)
    toast.success("Yeni kişi eklendi", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    reset();
  }
  return (
    <form className="taskForm" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          İsim
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
            required:"Bu isim daha önce eklenmiş",
            validate: (kisi) => 
            !kisiler.includes(kisi) || "Bu isim daha önce eklenmiş",
          })}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Ekle
        </button>
      </div>
    </form>
  );
};

export default PeopleForm;
