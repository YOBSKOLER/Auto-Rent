const API_URL = "http://localhost:3000/api/reservations";

// 🎯 Créer une nouvelle réservation
document
  .getElementById("reservationForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      userId: document.getElementById("userId").value.trim(),
      pickupLocation: document.getElementById("pickupLocation").value.trim(),
      returnLocation: document.getElementById("returnLocation").value.trim(),
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
    };

    // 🚨 Validation simple
    if (
      !data.userId ||
      !data.pickupLocation ||
      !data.startDate ||
      !data.endDate
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      const json = await res.json();
      alert("✅ Réservation créée avec succès !");
      document.getElementById("reservationForm").reset();
      fetchReservations(); // rafraîchir les réservations
    } catch (err) {
      console.error(err);
      alert("❌ Échec de la réservation.");
    }
  });

// 🔍 Afficher les réservations d'un utilisateur
async function fetchReservations() {
  const userId = document.getElementById("searchUserId").value.trim();
  if (!userId) {
    alert("Veuillez entrer un ID utilisateur.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${userId}`);
    if (!res.ok) throw new Error("Erreur lors du chargement");

    const reservations = await res.json();
    const container = document.getElementById("reservations");
    container.innerHTML = "";

    if (reservations.length === 0) {
      container.innerHTML =
        "<p class='text-muted'>Aucune réservation trouvée.</p>";
      return;
    }

    reservations.forEach((r) => {
      const div = document.createElement("div");
      div.className = "reservation border rounded p-3 mb-2 bg-white shadow-sm";
      div.innerHTML = `
        <strong>ID :</strong> ${r.id} <br>
        <strong>Départ :</strong> ${r.pickupLocation} <br>
        <strong>Retour :</strong> ${r.returnLocation || "—"} <br>
        <strong>Du :</strong> ${r.startDate} <strong>au</strong> ${
        r.endDate
      } <br>
        <strong>Statut :</strong> ${r.status || "en attente"} <br>
        <button class="btn btn-danger btn-sm mt-2" onclick="deleteReservation(${
          r.id
        })">🗑 Supprimer</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    alert("❌ Impossible de charger les réservations.");
  }
}

// 🗑 Supprimer une réservation
async function deleteReservation(id) {
  if (!confirm("Voulez-vous vraiment supprimer cette réservation ?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur lors de la suppression");
    alert("✅ Réservation supprimée");
    fetchReservations();
  } catch (err) {
    console.error(err);
    alert("❌ Échec de la suppression.");
  }
}
