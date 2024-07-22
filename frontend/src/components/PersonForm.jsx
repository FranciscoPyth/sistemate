import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PersonForm.css';

const PersonForm = () => {
  const [persons, setPersons] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [formData, setFormData] = useState({
    sphere: '', // Valor por defecto
    name: '',   // Nombre completo del usuario
    group: '',  // Grupo al que pertenece
    email: '',  // Correo electrónico
    amountDue: '', // Monto a pagar
    amountPaid: '' // Monto pagado
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/persons/')
      .then(response => {
        setPersons(response.data);
        console.log('Persons fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  }, []);

  const handlePersonSelect = (event) => {
    const selectedFullName = event.target.value;
    const person = persons.find(p => p.fullName === selectedFullName);
    setSelectedPerson(person);
    if (person) {
      setFormData({
        ...formData,
        name: person.fullName,
        group: person.groupName,
        email: person.email,
        amountDue: person.amountDue,
        amountPaid: person.amountPaid
      });
    } else {
      // Si no se encuentra la persona, limpia el formulario
      setFormData({
        ...formData,
        name: '',
        group: '',
        email: '',
        amountDue: '',
        amountPaid: ''
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar el formulario y enviar el correo electrónico
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="custom-form">
      <h2 className="form-title">Pago de campamento</h2>
      <div className="form-group">
        <label>Esfera de la Cate</label>
        <select
          name="sphere"
          className="form-control"
          value={formData.sphere}
          onChange={handleInputChange}
        >
          <option value="">Seleccionar...</option>
          <option value="Iniciate">Iniciate</option>
          <option value="Cate">Cate</option>
        </select>
      </div>
      <div className="form-group">
        <label>Nombre Completo</label>
        <input
          type="text"
          list="person-names"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handlePersonSelect}
        />
        <datalist id="person-names">
          {Array.isArray(persons) && persons.map((person, index) => (
            <option key={index} value={person.fullName} />
          ))}
        </datalist>
      </div>
      <div className="form-group">
        <label>Grupo al que Pertenece</label>
        <select
          name="group"
          className="form-control"
          value={formData.group}
          onChange={handleInputChange}
        >
          <option value="">Seleccionar...</option>
          {Array.isArray(persons) && persons.map((person, index) => (
            <option key={index} value={person.groupName}>{person.groupName}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Mail Asociado</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Falta Pagar</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input
            type="text"
            name="amountDue"
            className="form-control"
            value={formData.amountDue || ''} // Asegúrate de que sea una cadena vacía si está indefinido
            readOnly
          />
        </div>
      </div>
      <div className="form-group">
        <label>Esta Pagando</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input
            type="number"
            name="amountPaid"
            className="form-control"
            value={formData.amountPaid || ''} // Asegúrate de que sea una cadena vacía si está indefinido
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary submit-button">Enviar Comprobante</button>
    </form>
  );
};

export default PersonForm;
