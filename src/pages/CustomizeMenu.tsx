
import React, { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { useMenu, MenuItem } from "@/context/MenuContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import DND libraries
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const SortableMenuItem = ({ item }: { item: MenuItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="flex items-center p-3 mb-2 bg-white border rounded-md shadow-sm"
    >
      <div 
        className="flex items-center justify-center pr-2 cursor-grab" 
        {...attributes} 
        {...listeners}
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-center gap-2">
        {item.icon}
        <span className="font-medium">{item.name}</span>
      </div>
    </div>
  );
};

const CustomizeMenu = () => {
  const { menuItems, updateMenuItems, resetMenuOrder } = useMenu();
  const [activeTab, setActiveTab] = useState<string>("Main");
  const [localMenuItems, setLocalMenuItems] = useState<MenuItem[]>(menuItems);
  
  // Filter menu items by section
  const mainItems = localMenuItems.filter(item => item.section === "Main").sort((a, b) => a.order - b.order);
  const adminItems = localMenuItems.filter(item => item.section === "Administration").sort((a, b) => a.order - b.order);
  const resourceItems = localMenuItems.filter(item => item.section === "Resources").sort((a, b) => a.order - b.order);

  // Configure DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;
    
    const section = activeTab;
    const oldItems = localMenuItems.filter(item => item.section === section);
    const activeIndex = oldItems.findIndex(item => item.id === active.id);
    const overIndex = oldItems.findIndex(item => item.id === over.id);
    
    if (activeIndex !== -1 && overIndex !== -1) {
      // Create a new array with updated order values
      const newItems = [...localMenuItems];
      
      // Update orders only for items in the current section
      const sectionItems = newItems.filter(item => item.section === section);
      
      // Reorder the section items
      const [movedItem] = sectionItems.splice(activeIndex, 1);
      sectionItems.splice(overIndex, 0, movedItem);
      
      // Update order values
      sectionItems.forEach((item, index) => {
        item.order = index + 1;
      });
      
      // Replace the section items in the main array
      const updatedItems = newItems.map(item => {
        if (item.section === section) {
          const updatedItem = sectionItems.find(si => si.id === item.id);
          return updatedItem || item;
        }
        return item;
      });
      
      setLocalMenuItems(updatedItems);
    }
  };

  const handleSave = () => {
    updateMenuItems(localMenuItems);
    toast({
      description: "Menu order saved successfully",
    });
  };

  const handleReset = () => {
    resetMenuOrder();
    setLocalMenuItems(menuItems);
    toast({
      description: "Menu order has been reset to default",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gray-50">
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Customise Menu</h1>
              <p className="text-muted-foreground">
                Drag and drop items to reorder them within each section
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Sidebar Menu Items</CardTitle>
                <CardDescription>
                  Reorder the items in each section by dragging them up or down
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="Main" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="Main">Main Menu</TabsTrigger>
                    <TabsTrigger value="Administration">Administration</TabsTrigger>
                    <TabsTrigger value="Resources">Resources</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="Main">
                    <DndContext 
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      modifiers={[restrictToVerticalAxis]}
                    >
                      <SortableContext items={mainItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
                        {mainItems.map(item => (
                          <SortableMenuItem key={item.id} item={item} />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </TabsContent>
                  
                  <TabsContent value="Administration">
                    <DndContext 
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      modifiers={[restrictToVerticalAxis]}
                    >
                      <SortableContext items={adminItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
                        {adminItems.map(item => (
                          <SortableMenuItem key={item.id} item={item} />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </TabsContent>
                  
                  <TabsContent value="Resources">
                    <DndContext 
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      modifiers={[restrictToVerticalAxis]}
                    >
                      <SortableContext items={resourceItems.map(item => item.id)} strategy={verticalListSortingStrategy}>
                        {resourceItems.map(item => (
                          <SortableMenuItem key={item.id} item={item} />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" onClick={handleReset}>
                    Reset to Default
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CustomizeMenu;
