import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from 'reactstrap'
import { useAuth, useBuyer, useAppDispatch } from '@hooks/redux-hooks'
import { logoutAsync } from '@store/slices/auth-slice'
import { ROUTES } from '@constants/routes'
import { APP_CONFIG } from '@constants/app'

const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { cartItems } = useBuyer()
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const handleLogout = async () => {
    await dispatch(logoutAsync())
    navigate(ROUTES.LOGIN)
  }

  const handleNavigation = (route: string) => {
    navigate(route)
    setIsOpen(false) // Cerrar menú móvil
  }

  const cartItemsCount = cartItems.length

  return (
    <Navbar color="primary" dark expand="md" className="mb-4">
      <NavbarBrand href="#" onClick={() => handleNavigation(ROUTES.HOME)}>
        {APP_CONFIG.name}
      </NavbarBrand>
      
      <NavbarToggler onClick={toggle} />
      
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink 
              href="#" 
              onClick={() => handleNavigation(ROUTES.PRODUCTS)}
            >
              Productos
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink 
              href="#" 
              onClick={() => handleNavigation(ROUTES.CART)}
              className="position-relative"
            >
              Carrito
              {cartItemsCount > 0 && (
                <Badge 
                  color="warning" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.6rem' }}
                >
                  {cartItemsCount}
                </Badge>
              )}
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink 
              href="#" 
              onClick={() => handleNavigation(ROUTES.WISHLIST)}
            >
              Lista de Deseos
            </NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink 
              href="#" 
              onClick={() => handleNavigation(ROUTES.ORDERS)}
            >
              Mis Órdenes
            </NavLink>
          </NavItem>
        </Nav>
        
        <Nav navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {user?.name || 'Usuario'}
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem header>
                {user?.email}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleNavigation(ROUTES.PROFILE)}>
                Mi Perfil
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header