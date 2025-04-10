import React, { useState } from "react";
import { generateDocx } from "../shared/constants";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    phone: "",
    passportSeries: "",
    passportNumber: "",
    residence: "",
  });

  const [errors, setErrors] = useState({
    fullName: false,
    age: false,
    phone: false,
    passportSeries: false,
    passportNumber: false,
    residence: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value }));
  };

  const validateForm = () => {
    const newErrors = {
      fullName: !formData.fullName,
      age: !formData.age,
      phone: !formData.phone,
      passportSeries: !formData.passportSeries,
      passportNumber: !formData.passportNumber,
      residence: !formData.residence,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      generateDocx(formData, () => {
        onClose();
        setFormData({
          fullName: "",
          age: "",
          phone: "",
          passportSeries: "",
          passportNumber: "",
          residence: "",
        });
        setErrors({
          fullName: false,
          age: false,
          phone: false,
          passportSeries: false,
          passportNumber: false,
          residence: false,
        });
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Заполните данные</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ф.И.О *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Введите данные"
              className={`w-full p-2 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                Поле обязательно для заполнения
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Возраст *
            </label>
            <input
              type="number"
              name="age"
              placeholder="Введите данные"
              value={formData.age}
              onChange={handleInputChange}
              required
              className={`w-full p-2 border ${
                errors.age ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">
                Поле обязательно для заполнения
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Телефон *
            </label>
            <input
              type="tel"
              placeholder="Введите данные"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={`w-full p-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                Поле обязательно для заполнения
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Паспорт *
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="passportSeries"
                value={formData.passportSeries}
                onChange={handleInputChange}
                placeholder="Серия"
                required
                className={`w-1/2 p-2 border ${
                  errors.passportSeries ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
              />
              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleInputChange}
                placeholder="Номер"
                required
                className={`w-1/2 p-2 border ${
                  errors.passportNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
              />
            </div>
            {(errors.passportSeries || errors.passportNumber) && (
              <p className="text-red-500 text-xs mt-1">
                Поле обязательно для заполнения
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Место проживания *
            </label>
            <input
              type="text"
              name="residence"
              value={formData.residence}
              onChange={handleInputChange}
              placeholder="Введите данные"
              required
              className={`w-full p-2 border ${
                errors.residence ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
            />
            {errors.residence && (
              <p className="text-red-500 text-xs mt-1">
                Поле обязательно для заполнения
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
