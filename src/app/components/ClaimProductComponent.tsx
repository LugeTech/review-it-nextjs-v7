"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
// import { toast } from '@/components/ui/toast';
import { Star, MessageSquare, MapPin } from 'lucide-react';
import { iProduct } from "@/app/util/Interfaces";

const EnhancedClaimProductComponent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const router = useRouter();

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const product = {
    "id": "1234",
    "address": "123 Main Street, Cityville, State 12345",
    "createdDate": "2024-09-13T19:30:00Z",
    "description": "Experience the future of coffee brewing with our AI-powered smart coffee maker. This sleek device learns your preferences and brews the perfect cup every time.",
    "display_image": "https://example.com/images/smart-coffee-maker-main.jpg",
    "images": [
      "https://example.com/images/smart-coffee-maker-angle1.jpg",
      "https://example.com/images/smart-coffee-maker-angle2.jpg",
      "https://example.com/images/smart-coffee-maker-in-use.jpg"
    ],
    "videos": [
      "https://example.com/videos/smart-coffee-maker-demo.mp4"
    ],
    "links": [
      "https://example.com/smart-coffee-maker-manual.pdf",
      "https://example.com/smart-coffee-maker-recipes"
    ],
    "name": "FutureBrew AI Coffee Maker",
    "tags": [
      "coffee maker",
      "smart appliance",
      "AI",
      "kitchen gadget"
    ],
    "openingHrs": "09:00",
    "closingHrs": "18:00",
    "telephone": "+1 (555) 123-4567",
    "website": [
      "https://futurebrew.example.com"
    ],
    "rating": 4.7,
    "hasOwner": true,
    "ownerId": "user_987654321",
    "reviews": [
      {
        "id": "rev_001",
        "userId": "user_111222333",
        "rating": 5,
        "comment": "Best coffee maker I've ever owned! The AI really nails my preferences.",
        "createdDate": "2024-09-10T14:23:00Z"
      },
      {
        "id": "rev_002",
        "userId": "user_444555666",
        "rating": 4,
        "comment": "Great product, but took a while to learn my taste. Now it's perfect!",
        "createdDate": "2024-09-11T09:15:00Z"
      }
    ],
    "createdBy": {
      "id": "user_admin123",
      "name": "Admin User",
      "email": "admin@example.com"
    },
    "createdById": "user_admin123",
    "isDeleted": false,
    "email": "info@futurebrew.example.com",
    "businessOwner": {
      "id": "bo_123456",
      "name": "FutureBrew Inc.",
      "contactEmail": "contact@futurebrew.example.com"
    },
    "businessOwnerId": "bo_123456"
  }

  const handleClaimproduct = async () => {
    setIsClaiming(true);
    try {
      const response = await fetch('/api/claim-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to claim product');
      }

      const result = await response.json();

      // toast({
      //   title: "product Claimed Successfully!",
      //   description: "You can now manage this product.",
      // });

      // Redirect to the product update page
      router.push(`/product/${result.productOwnerId}/update`);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: error.message,
      //   variant: "destructive",
      // });
    } finally {
      setIsClaiming(false);
      handleCloseDialog();
    }
  };

  return (
    <>
      <Button className="bg-white hover:bg-grat-100" onClick={handleOpenDialog}>Claim This product</Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Claim Your product</DialogTitle>
            <DialogDescription>
              You&apos;re about to claim ownership of this product. Please review the information below to ensure it&apos;s correct.
            </DialogDescription>
          </DialogHeader>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {product.address}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="font-medium mr-2">{product.rating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews?.length} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    Recent review: &quot;Some review title here&quot;
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleClaimproduct} disabled={isClaiming}>
              {isClaiming ? 'Claiming...' : 'Confirm Claim'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedClaimProductComponent;
