import React from 'react';
import { List, ListItem, Typography, Link, Divider } from '@mui/joy';
import { styled } from '@mui/joy/styles';


const SidebarContainer = styled('div')`
  width: 250px;
  background-color: #fafafa; 
  padding: 16px;
  border-right: 1px solid #ddd; 
  height: 100vh; 
  display: flex;
  flex-direction: column;
`;


const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  display: block;
  padding: 8px 16px;
  border-radius: 4px;
  &:hover {
    background-color: #e0e0e0; /* Color de fondo al pasar el cursor */
  }
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <Typography level="h5" component="h2" style={{ marginBottom: 16 }}>
                Sistema de Inventario
            </Typography>
            <Divider />
            <List sx={{ padding: 0 }}>
                <ListItem>
                    <StyledLink href="/ventas">Ventas</StyledLink>
                </ListItem>
                <ListItem>
                    <StyledLink href="/facturas">Facturas</StyledLink>
                </ListItem>
                <ListItem>
                    <StyledLink href="/inventario">Inventario</StyledLink>
                </ListItem>
                <ListItem>
                    <StyledLink href="/">Salir</StyledLink>
                </ListItem>
            </List>
        </SidebarContainer>
    );
};

export default Sidebar;
