import config from "src/config/config";

const procedureService = {
  createProcedure: async (procedureData) => {
    try {
      const response = await fetch(`${config.backendUrl}/create_procedure`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(procedureData),
      });

      if (!response.ok) {
        throw new Error("Failed to create procedure");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  listProcedures: async () => {
    try {
      const response = await fetch(`${config.backendUrl}/procedures`);

      if (!response.ok) {
        throw new Error("Failed to fetch procedures");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  getProcedureById: async (procedureId) => {
    try {
      const response = await fetch(`${config.backendUrl}/procedure/${procedureId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch procedure");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  updateProcedure: async (procedureId, updatedProcedureData) => {
    try {
      const response = await fetch(`${config.backendUrl}/procedure/${procedureId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProcedureData),
      });

      if (!response.ok) {
        throw new Error("Failed to update procedure");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteProcedure: async (procedureId) => {
    try {
      const response = await fetch(`${config.backendUrl}/procedure/${procedureId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete procedure");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

export default procedureService;
