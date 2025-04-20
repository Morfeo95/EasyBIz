  // src/pages/Profile.jsx
  import React, { useContext, useEffect, useState } from 'react';
  import { useLocation } from 'react-router-dom';
  import { AuthContext } from '../context/AuthContext';
  import Sidebar from '../components/interface/Sidebar';
  import Header from '../components/interface/Header';
  import Modal from '../components/UI/Modal';
  import useTranslations from '../hooks/useTranslations';
  import Dashboard from '../components/perfil/Dashboard';
  import BusinessSection from '../components/perfil/BusinessSection';
  import ProductSection from '../components/perfil/ProductSection';
  import EstimadoSection from '../components/perfil/EstimadoSection';
  import BusinessForm from '../components/perfil/BusinessForm';
  import ProductForm from '../components/perfil/ProductForm';
  import AjustesSection from '../components/perfil/AjustesSection';
  import { updateUsuario, getUsuario } from '../services/usuarioService';
  import {
    fetchBusinesses,
    createBusiness,
    fetchBusinessById,
    updateBusiness,
    deleteBusiness
  } from '../services/profileService';
  import {
    fetchProductsByBusiness,
    createProduct,
    deleteProduct,
    updateProduct,
  } from '../services/productService';
  import {
    fetchEstimados,
    createEstimado,
    updateEstimado,
    deleteEstimado,
  } from '../services/estimadoService';
  import { motion, AnimatePresence } from 'framer-motion';
  import { Building2, PackagePlus, LayoutDashboard, FileText, Settings } from 'lucide-react';

  const tabIcons = {
    dashboard: <LayoutDashboard className="w-5 h-5 mr-2 text-green-600" />,
    businesses: <Building2 className="w-5 h-5 mr-2 text-blue-600" />,
    products: <PackagePlus className="w-5 h-5 mr-2 text-purple-600" />,
    estimados: <FileText className="w-5 h-5 mr-2 text-purple-600" />,
    settings: <Settings className="w-5 h-5 mr-2 text-yellow-600" />
  };

  const Profile = () => {
    const messages = useTranslations();
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const prodId = params.get("productId");
    const estimadoIdParam = params.get("estimadoId");
    const [editingBusiness, setEditingBusiness] = useState(null);

    // Estados para datos y UI
    const [businesses, setBusinesses] = useState([]);
    const [products, setProducts] = useState([]);
    const [estimados, setEstimados] = useState([]);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [modalType, setModalType] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
      if (!messages || !messages.perfil || !user) return;
      const load = async () => {
        try {
          const biz = await fetchBusinesses();
          setBusinesses(biz);
          const pages = await Promise.all(
            biz.map(b => fetchProductsByBusiness(b.id, { page: 0, size: 100 }).then(r => r.content))
          );
          setProducts(pages.flat());
          const resp = await fetchEstimados(user.id, 0, 100);
          setEstimados(resp.content || resp);
        } catch (e) {
          setError(e.message || messages.perfil.errorFallback);
        }
      };
      load();
    }, [messages, user]);
    // NUEVO: Abrir el modal de producto si se detecta productId en la query string
    useEffect(() => {
      if (prodId || estimadoIdParam) {
        setActiveTab("products");
        setModalType("product");
      }
    }, [prodId, estimadoIdParam]);

    const openModal = type => setModalType(type);
    const closeModal = () => {
      setEditingBusiness(null);
      setModalType(null);
    };

    if (!messages || !messages.perfil) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500" />
        </div>
      );
    } 

    const { tabs: tabLabels, modal: modalLabels } = messages.perfil;
    const tabs = Object.keys(tabLabels);

    const handleUpdateUser = async (data) => {
      try {
        const updated = await updateUsuario(data);
        console.log("Usuario actualizado: ", updated);
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
      }
    };

    // Métodos para negocios
    const handleEditBusiness = async (biz) => {
      // opcional: recargar datos frescos
      const full = await fetchBusinessById(biz.id);
      setEditingBusiness(full);
      setModalType('business');
    };
    
    // Eliminar negocio
    const handleDeleteBusiness = async (id) => {
      try {
        await deleteBusiness(id);
        setBusinesses(prev => prev.filter(b => b.id !== id));
      } catch (err) {
        setError(err.message);
      }
    };
    
    // Crear o actualizar según exista editingBusiness
    const handleSaveBusiness = async (data) => {
      try {
        let saved;
        if (editingBusiness) {
          saved = await updateBusiness({ 
            id: editingBusiness.id,
            usuarioId: Number(localStorage.getItem('id')),
            name: data.name,
            urlPhoto: data.urlPhoto,
            productos: data.productos
          });
          setBusinesses(prev =>
            prev.map(b => (b.id === saved.id ? saved : b))
          );
        } else {
          saved = await createBusiness({ 
            name: data.name,
            urlPhoto: data.urlPhoto,
            productos: data.productos
          });
          setBusinesses(prev => [...prev, saved]);
        }
        setEditingBusiness(null);
        closeModal();
      } catch (err) {
        setError(err.message);
      }
    };

    // Métodos para productos
    const handleCreateProduct = async (data) => {
      try {
        const newProd = await createProduct(data);
        setProducts(prev => [...prev, newProd]);
        closeModal();
      } catch (err) {
        setError(err.message);
      }
    };

    const handleUpdateProduct = async (data) => {
      try {
        const updated = await updateProduct(data);
        setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
        closeModal();
      } catch (err) {
        setError(err.message);
      }
    };

    const handleDeleteProduct = async (id) => {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        setError(err.message);
      }
    };

    // Métodos para estimados (creación y actualización se realizan en OpenCalc)
    const handleDeleteEstimado = async (id) => {
      try {
        await deleteEstimado(id);
        setEstimados(prev => prev.filter(e => e.id !== id));
      } catch (err) {
        setError(err.message);
      }
    };
    if (!messages || !messages.perfil) {
      return <div className="p-4">Cargando perfil...</div>;
    }

    return (
      <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block fixed md:relative z-40`}>
          <Sidebar
            active={activeTab}
            onSelect={(tab) => {
              setActiveTab(tab);
              setSidebarOpen(false);
            }}
          />
        </div>

        {/* Contenido principal */}
        <div className="flex-1 md:ml-64 p-4 md:p-6 space-y-6 mt-16 md:mt-0">
          <Header user={user} />

          {/* Pestañas de navegación */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center whitespace-nowrap px-4 py-2 rounded-full transition-colors duration-300 ${
                  activeTab === tab
                    ? 'bg-green-200 text-green-900 font-semibold'
                    : 'bg-white hover:bg-gray-200 text-gray-700'
                } shadow-sm border`}
              >
                {tabIcons[tab]}
                <span className="hidden sm:inline">
                {tabLabels[tab]}
                </span>
              </button>
            ))}
          </div>

          {/* Contenido según pestaña seleccionada */}
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow p-6"
              >
                <Dashboard
                  businesses={businesses}
                  products={products}
                  estimates={estimados}
                  onSelectStat={(key) => setActiveTab(key)}
                />
              </motion.div>
            )}
            {activeTab === 'businesses' && (
              <motion.div
                key="businesses"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow p-6"
              >
                <BusinessSection
                  businesses={businesses}
                  openModal={() => { setEditingBusiness(null); openModal('business'); }}
                  onEditBusiness={handleEditBusiness}
                  onDeleteBusiness={handleDeleteBusiness}
                />
              </motion.div>
            )}
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow p-6"
              >
                <ProductSection
                  products={products}
                  openModal={openModal}
                  onDeleteProduct={handleDeleteProduct}
                />
              </motion.div>
            )}
            {activeTab === 'estimados' && (
              <motion.div
                key="estimados"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow p-6"
              >
                <EstimadoSection
                  estimates={estimados}
                  onDeleteEstimado={handleDeleteEstimado}
                />
              </motion.div>
            )}
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow p-6"
              >
                <AjustesSection userData={user} onUpdateUser={handleUpdateUser} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modales para negocio y producto */}
          <AnimatePresence>
          {modalType === 'business' && (
            <Modal
            isOpen
            onClose={() => { setEditingBusiness(null); closeModal(); }}
            title={
              editingBusiness
                ? modalLabels.editBusiness
                : modalLabels.addBusiness
            }
          >
              <BusinessForm
                initialData={editingBusiness}
                onSubmit={handleSaveBusiness}
              />
            </Modal>
          )}
            {modalType === 'product' && (
               <Modal
               isOpen
               onClose={closeModal}
               title={modalLabels.addProduct}
             >
                <ProductForm
                  productId={prodId}
                  businesses={businesses}
                  onCreate={handleCreateProduct}
                  onUpdate={handleUpdateProduct}
                />
              </Modal>
            )}
            {/* Se elimina el modal para "estimado" ya que su creación/edición se realizan en OpenCalc */}
          </AnimatePresence>

          {/* Muestra de errores */}
          {error && (
          <div className="p-4 bg-red-100 border border-red-300 text-red-800 rounded">
            {errorFallback} {error}
          </div>
        )}
        </div>
      </div>
    );
  };

  export default Profile;
